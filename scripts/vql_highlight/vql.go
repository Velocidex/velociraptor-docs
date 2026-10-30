package main

import (
	"bytes"
	"fmt"
	gohtml "html"
	"strings"

	"github.com/alecthomas/chroma/v2"
	"github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/alecthomas/chroma/v2/styles"
)

// VQL returns a Chroma lexer for the VQL language whose token classes match
// what Hugo's embedded Chroma SQL lexer uses (class-prefix-free).  The
// grammar is derived from the Velociraptor LSP semantic_tokens mapping:
//
//	vfilter.go:vqlLexer  → comment/string/number/operator/keyword token sets
//	services/lsp/semantic_tokens.go → identifier subclassification
//
// Differences from the LSP are documented in comments below.
func VQL() chroma.Lexer {
	lexer := chroma.MustNewLexer(
		&chroma.Config{
			Name:      "VQL",
			Aliases:   []string{"vql", "VQL"},
			Filenames: []string{"*.vql"},
			MimeTypes: []string{"text/vql"},
		},
		func() chroma.Rules {
			return chroma.Rules{
				"root": {
					// Whitespace.
					{Pattern: `\s+`, Type: chroma.TextWhitespace},
					// C-style block comments.
					{Pattern: `(?s)/\*.*?\*/`, Type: chroma.CommentMultiline},
					// SQL-style and C++-style line comments.
					{Pattern: `(?m)^--.*?$`, Type: chroma.CommentSingle},
					{Pattern: `(?m)^//.*?$`, Type: chroma.CommentSingle},
					// Triple-single-quoted strings (must precede the general
					// string rule so `'''` is not read as `''` + `'`).
					{Pattern: `(?s)'''.*?'''`, Type: chroma.LiteralStringHeredoc},
					// Single and double quoted strings with backslash escapes.
					{Pattern: `'(?:\\.|[^'\\])*'`, Type: chroma.LiteralStringSingle},
					{Pattern: `"(?:\\.|[^"\\])*"`, Type: chroma.LiteralStringDouble},
					// Numbers: hex, decimal, optional sign and exponent.
					{Pattern: `-?(0x[0-9a-fA-F]+|\d*\.?\d+([eE][-+]?\d+)?)`, Type: chroma.LiteralNumber},
					// Let-bound variables.
					{Pattern: `(?i)\bLET\b`, Type: chroma.Keyword, Mutator: chroma.Push("let")},
					// Keywords (case-insensitive).  GROUP/ORDER BY are multi-word.
					{Pattern: chromaWords("EXPLAIN", "SELECT", "WHERE", "AND", "OR",
						"FROM", "NOT", "AS", "IN", "LIMIT", "NULL", "DESC",
						"TRUE", "FALSE"), Type: chroma.Keyword},
					{Pattern: `(?i)\bGROUP\s+BY\b`, Type: chroma.Keyword},
					{Pattern: `(?i)\bORDER\s+BY\b`, Type: chroma.Keyword},
					// Symbol identifiers: -name or -`name`.
					{Pattern: `-[a-zA-Z_][a-zA-Z0-9_]*|-` + "`[^`]+`", Type: chroma.Name},
					// Backtick identifiers  `foo bar`.
					{Pattern: "`[^`]+`", Type: chroma.Name},
					// Function / plugin call: identifier followed by `(`.
					// This must precede the property rule so that a dotted
					// call such as `Artifact.Windows.Carving.CobaltStrike()`
					// is coloured whole as Name.Function.  A negative
					// lookahead on the property rule is not enough: the
					// regex engine backtracks the trailing `*` to satisfy
					// it and splits the final letter off the name.
					{Pattern: `[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()`, Type: chroma.NameFunction},
					// Dotted property: `.Foo` in `accessor.Foo`.  Lookbehind
					// so it only fires after the dot was consumed; calls
					// were already claimed by the rule above.
					{Pattern: `(?<=\.)[a-zA-Z_][a-zA-Z0-9_]*`, Type: chroma.NameProperty},
					// Plain identifiers.
					{Pattern: `[a-zA-Z_][a-zA-Z0-9_]*`, Type: chroma.Name},
					// Operators (multi-char first) and punctuation.
					// NOTE: `|` and `||` are Operator here (deliberate deviation
					// from the LSP mapping which colours them Keyword; simple
					// pipes and OR-operators read better as operators).
					{Pattern: `<>|!=|<=|>=|=>|=~|&&|\|\|?|[+\-*/%]|[=<>!]|[.,;:]`, Type: chroma.Operator},
					{Pattern: `[()\[\]{}]`, Type: chroma.Punctuation},
				},
				// After `LET`, the next identifier is a bound variable.
				"let": {
					{Pattern: `\s+`, Type: chroma.TextWhitespace},
					{Pattern: `[a-zA-Z_][a-zA-Z0-9_]*`, Type: chroma.NameVariable, Mutator: chroma.Pop(1)},
					{Pattern: "`[^`]+`", Type: chroma.NameVariable, Mutator: chroma.Pop(1)},
					// If the next token is not an identifier bail out.
					{Pattern: `.`, Type: chroma.Name, Mutator: chroma.Pop(1)},
				},
			}
		},
	)
	return lexer
}

// chromaWords builds a case-insensitive word-boundary regex that matches any
// of the supplied keywords (e.g. SELECT, WHERE, ...).
func chromaWords(words ...string) string {
	return chroma.Words("(?i)\\b", "\\b", words...)
}

// hugoPreWrapper replicates Hugo's markup/highlight preWrapper so the
// generated HTML is byte-identical to what Hugo's `highlight` function would
// produce for the same input (modulo the switch from the SQL lexer to VQL).
type hugoPreWrapper struct {
	language string
}

func (p *hugoPreWrapper) Start(code bool, styleAttr string) string {
	var language string
	if code {
		language = p.language
	}
	w := &strings.Builder{}
	fmt.Fprintf(w, `<pre tabindex="0"%s>`, styleAttr)
	fmt.Fprint(w, "<code")
	if language != "" {
		language = gohtml.EscapeString(language)
		fmt.Fprint(w, ` class="language-`+language+`"`)
		fmt.Fprint(w, ` data-lang="`+language+`"`)
	}
	fmt.Fprint(w, ">")
	return w.String()
}

func (p *hugoPreWrapper) End(code bool) string {
	return "</code></pre>"
}

// Highlight renders VQL code to the exact HTML Hugo's highlight function
// would emit (classes, no line numbers, chrome pre-wrapper).
func Highlight(code string) (string, error) {
	lexer := VQL()
	lexer = chroma.Coalesce(lexer)
	iterator, err := lexer.Tokenise(nil, code)
	if err != nil {
		return "", err
	}
	style := styles.Get("github")
	if style == nil {
		style = styles.Fallback
	}
	var buf bytes.Buffer
	buf.WriteString(`<div class="highlight">`)
	formatter := html.New(
		html.WithClasses(true),
		html.WithLineNumbers(false),
		html.WithPreWrapper(&hugoPreWrapper{language: "vql"}),
	)
	if err := formatter.Format(&buf, style, iterator); err != nil {
		return "", err
	}
	buf.WriteString("</div>")
	return buf.String(), nil
}
