// Command vql_highlight scans the Hugo content directory for fenced code
// blocks with language "vql" or "VQL", hashes each block's inner content
// with SHA-256, renders the VQL to pre-formatted HTML using a Chroma
// lexer whose output matches Hugo's own highlight() function, and writes
// one file per unique hash to the output directory.
//
// Usage:
//
//	vql_highlight -content content -out generated/vql
//
// A JSON manifest mapping content-relative paths to their vql fence counts
// can optionally be written with -manifest.
package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/text"
)

// fence records one fenced code block parsed by goldmark.
type fence struct {
	Path  string // absolute path to source file
	Lang  string // raw language token from info string (may be "vql", "VQL", "sql", …)
	Line  int    // 1-based line number of the opening fence
	Inner string // deindented, trimmed text that Hugo passes to the render hook
}

// extractFences parses a markdown file with goldmark and returns every
// fenced code block it contains.
func extractFences(path string, source []byte) ([]fence, error) {
	md := goldmark.New()
	reader := text.NewReader(source)
	root := md.Parser().Parse(reader)
	var out []fence
	err := ast.Walk(root, func(n ast.Node, entering bool) (ast.WalkStatus, error) {
		if !entering {
			return ast.WalkContinue, nil
		}
		fcb, ok := n.(*ast.FencedCodeBlock)
		if !ok {
			return ast.WalkContinue, nil
		}
		lang := ""
		if langSeg := fcb.Language(source); langSeg != nil {
			lang = string(langSeg)
		}
		// lines() returns deindented segments already (goldmark strips the
		// fence's leading indentation).  Each segment includes the trailing
		// newline except possibly the last line.
		lines := fcb.Lines()
		var sb strings.Builder
		for i := 0; i < lines.Len(); i++ {
			seg := lines.At(i)
			sb.Write(seg.Value(source))
		}
		// Hugo's .Inner matches goldmark's segments joined, then any
		// trailing newline(s) stripped (blank lines immediately preceding
		// the closing fence / EOF are never present in the segments).
		inner := strings.TrimRight(sb.String(), "\n")
		line := 1
		if lines.Len() > 0 {
			// The segment Start field is a byte offset within the raw
			// source; convert to a 1-based line number.
			line = bytesToLine(source, lines.At(0).Start)
		}
		out = append(out, fence{
			Path:  path,
			Lang:  lang,
			Line:  line,
			Inner: inner,
		})
		return ast.WalkContinue, nil
	})
	return out, err
}

// bytesToLine returns the 1-based line number of the given byte offset.
func bytesToLine(src []byte, offset int) int {
	n := 1
	for _, b := range src[:offset] {
		if b == '\n' {
			n++
		}
	}
	return n
}

// walkContent walks a content directory for .md files (skipping the legacy
// WordPress export subtree excluded by the Hugo module mount filter).
func walkContent(root string) ([]string, error) {
	var paths []string
	err := filepath.WalkDir(root, func(p string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			rel, _ := filepath.Rel(root, p)
			name := d.Name()
			if name == ".git" || name == ".hg" || name == ".DS_Store" {
				return filepath.SkipDir
			}
			// Mirror hugo.toml module.mounts files exclusion.
			if rel == "blog/html" {
				return filepath.SkipDir
			}
			return nil
		}
		ext := strings.ToLower(filepath.Ext(p))
		if ext == ".md" || ext == ".markdown" || ext == ".mdown" {
			paths = append(paths, p)
		}
		return nil
	})
	sort.Strings(paths)
	return paths, err
}

func main() {
	contentDir := flag.String("content", "content", "content directory to scan")
	outDir := flag.String("out", "generated/vql", "output directory for rendered HTML files")
	manifestPath := flag.String("manifest", "", "write per-file fence-count JSON to this path")
	dumpPath := flag.String("dump", "", "write TSV of every fence (path, ordinal, lang, sha) for debugging")
	flag.Parse()

	if *outDir == "" {
		fatal("error: -out is required")
	}

	// Clean and recreate the output directory so stale files from removed
	// or edited fences never linger.
	if err := os.RemoveAll(*outDir); err != nil {
		fatal("error: cannot remove %s: %v", *outDir, err)
	}
	if err := os.MkdirAll(*outDir, 0o755); err != nil {
		fatal("error: cannot create %s: %v", *outDir, err)
	}

	files, err := walkContent(*contentDir)
	if err != nil {
		fatal("error: walk %s: %v", *contentDir, err)
	}

	seen := map[string]struct{}{} // inner text → already rendered
	byFile := map[string]int{}    // relative path → vql fence count
	totalFences := 0
	totalVQL := 0
	totalDistinct := 0

	var dump []string
	if *dumpPath != "" {
		dump = append(dump, "path\tordinal\tlang\tsha")
	}

	for _, f := range files {
		source, err := os.ReadFile(f)
		if err != nil {
			fatal("error: reading %s: %v", f, err)
		}
		fences, err := extractFences(f, source)
		if err != nil {
			fatal("error: parsing %s: %v", f, err)
		}
		rel, _ := filepath.Rel(*contentDir, f)
		for ordinal, fc := range fences {
			totalFences++
			h := sha256.Sum256([]byte(fc.Inner))
			hs := hex.EncodeToString(h[:])
			if *dumpPath != "" {
				dump = append(dump, fmt.Sprintf("%s\t%d\t%s\t%s", rel, ordinal, strings.ToLower(fc.Lang), hs))
			}
			lang := strings.ToLower(fc.Lang)
			if lang != "vql" {
				continue
			}
			totalVQL++
			byFile[rel]++
			if _, ok := seen[fc.Inner]; ok {
				continue
			}
			seen[fc.Inner] = struct{}{}

			html, err := Highlight(fc.Inner)
			if err != nil {
				fatal("error: rendering VQL at %s:%d: %v", fc.Path, fc.Line, err)
			}
			name := hs + ".html"
			if err := os.WriteFile(filepath.Join(*outDir, name), []byte(html), 0o644); err != nil {
				fatal("error: writing %s: %v", name, err)
			}
			totalDistinct++
		}
	}

	if *dumpPath != "" {
		if err := os.WriteFile(*dumpPath, []byte(strings.Join(dump, "\n")+"\n"), 0o644); err != nil {
			fatal("error: writing dump %s: %v", *dumpPath, err)
		}
	}

	if *manifestPath != "" {
		data, err := json.MarshalIndent(byFile, "", "  ")
		if err != nil {
			fatal("error: marshalling manifest: %v", err)
		}
		if err := os.WriteFile(*manifestPath, data, 0o644); err != nil {
			fatal("error: writing manifest %s: %v", *manifestPath, err)
		}
	}

	fmt.Printf("scanned %d files → %d fences, %d vql (%d distinct bodies, %d files)\n",
		len(files), totalFences, totalVQL, totalDistinct, len(byFile))
}

func fatal(format string, args ...any) {
	fmt.Fprintf(os.Stderr, format+"\n", args...)
	os.Exit(1)
}
