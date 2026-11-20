# Generic.Detection.Yara.PHP2Shell

YARA scan of web server, PHP, container, WAF and system logs for PHP2Shell
(CVE-2026-109618 / CVE-2026-109619) exploitation. Rules are built from the
confirmed in-the-wild chains in the 0x4D31 honeypot report and its released
case logs (24 Oct 2026), the public 9bie php2shell-bypass-aslr-exp PoC and
the StealMyBitcoin CTF PoC.

Chain and the log evidence each stage leaves:

| Stage | Request | Log evidence (rule) |
|---|---|---|
| A1 heap pressure | upload-progress multipart, e.g. 9bie `POST /?q0000000=v&...q0000004=v` | PoC query string (High), pre-script OOM `in Unknown on line 0` (Medium) |
| B1 disclosure | leaked heap returns in `PHPSESSID` (819,200 B for 9bie, 16/256 B for StealMyBitcoin) | percent-escaped PHPSESSID Set-Cookie in WAF/JSON access logs (High), >=800 KB no-UA POST response where Apache logs `%O` (Medium), startup session warning (Medium) |
| A2 heap pressure | fixed-length multipart | pre-script OOM (Medium) |
| B2 execution | fake zend_array destructor -> `system()` -> `/bin/sh` / `cmd.exe` | shell stderr in server error log (High), worker crash: AH00051, FPM, kernel, nginx upstream (Low) |
| Pinning | `exploit.py --workers` holds N-1 pre-fork children | MaxRequestWorkers / pm.max_children reached (Low) |

`PHP2Shell_Chain_Cluster` (High) marks logs where two pre-script OOMs fall
within 256 KB with a startup limit or invalid-session warning nearby: the
grooming pattern of both PoCs, independent of IOCs. Once a file contains a
cluster, every OOM/limit/session-ID line in that file carries the rule.

IOCs (source IPs, proof callback paths) are compiled from the `IOCs` table
into one rule per indicator.

Output: one row per log line. `Rules`/`Stages` aggregate every rule that
matched the line and `Severity` is the highest. Severity rates the indicator,
not the host: correlate A1->B1->A2->B2 by `ClientIP` and time.

Coverage is written to the collection log: candidate logs by scan status,
files not scanned because of size or compression, and rejected IOC rows. A
`YaraRule` compile failure logs `ERROR:yara` and marks the collection as
errored. No hits is not evidence of absence: check the log.

PHP-side rules (OOM, session, limits) need `log_errors=On`. PHP's built-in
default is `log_errors=0` / `display_errors=1`, and the official Docker images
ship no active php.ini, so there these errors only reach the HTTP response.
php.ini-production and php.ini-development both set `log_errors = On`.

Notes:

- Logs only. Inventory/exposure is out of scope (Generic.Applications.PHPInventory).
- Each YARA string captures its line, so the match is the evidence line.
  libyara limits: `Line` is capped at 511 bytes (512-byte match data), and a
  line is missed if the matched text starts more than ~1023 bytes into it.
- Plain files are mmap-scanned in full. `.gz`/`.bz2` are streamed through the
  gzip/bzip2 accessors in small blocks: a line split across a block boundary
  can be missed or reported in part.
- Container stdout/stderr is covered via Docker json-file, CRI pod and Podman
  logs on the host. Docker escapes `&` and `"` (`\u0026`, `\"`); rules allow both.
- Set-Cookie leaks and `ClientIP` are also read from ModSecurity audit
  header lines and JSON access logs (`peerIp`, `remote_addr`, `client_ip`, ...).
- journald files are scanned raw: `Line` is the data object (`MESSAGE=...`).
  Parse hits with Linux.Forensics.Journal.
- Date filters apply to file Mtime, not line timestamps. Disclosure was
  2026-10-21; DateAfter=2026-10-20 bounds a fleet hunt.
- `NumberOfHits` is a per-file budget across all rules. Rules report in
  declaration order (High first, noisy last); `HitLimitReached` marks rows
  from a file that exhausted it (that file's results are incomplete).
- `UploadHits` uploads each file with at least one YARA match once and adds
  an `Upload` column to that file's rows.


---

````yaml
name: Generic.Detection.Yara.PHP2Shell
author: Matt Green - @mgreen27
description: |
  YARA scan of web server, PHP, container, WAF and system logs for PHP2Shell
  (CVE-2026-109618 / CVE-2026-109619) exploitation. Rules are built from the
  confirmed in-the-wild chains in the 0x4D31 honeypot report and its released
  case logs (24 Oct 2026), the public 9bie php2shell-bypass-aslr-exp PoC and
  the StealMyBitcoin CTF PoC.

  Chain and the log evidence each stage leaves:

  | Stage | Request | Log evidence (rule) |
  |---|---|---|
  | A1 heap pressure | upload-progress multipart, e.g. 9bie `POST /?q0000000=v&...q0000004=v` | PoC query string (High), pre-script OOM `in Unknown on line 0` (Medium) |
  | B1 disclosure | leaked heap returns in `PHPSESSID` (819,200 B for 9bie, 16/256 B for StealMyBitcoin) | percent-escaped PHPSESSID Set-Cookie in WAF/JSON access logs (High), >=800 KB no-UA POST response where Apache logs `%O` (Medium), startup session warning (Medium) |
  | A2 heap pressure | fixed-length multipart | pre-script OOM (Medium) |
  | B2 execution | fake zend_array destructor -> `system()` -> `/bin/sh` / `cmd.exe` | shell stderr in server error log (High), worker crash: AH00051, FPM, kernel, nginx upstream (Low) |
  | Pinning | `exploit.py --workers` holds N-1 pre-fork children | MaxRequestWorkers / pm.max_children reached (Low) |

  `PHP2Shell_Chain_Cluster` (High) marks logs where two pre-script OOMs fall
  within 256 KB with a startup limit or invalid-session warning nearby: the
  grooming pattern of both PoCs, independent of IOCs. Once a file contains a
  cluster, every OOM/limit/session-ID line in that file carries the rule.

  IOCs (source IPs, proof callback paths) are compiled from the `IOCs` table
  into one rule per indicator.

  Output: one row per log line. `Rules`/`Stages` aggregate every rule that
  matched the line and `Severity` is the highest. Severity rates the indicator,
  not the host: correlate A1->B1->A2->B2 by `ClientIP` and time.

  Coverage is written to the collection log: candidate logs by scan status,
  files not scanned because of size or compression, and rejected IOC rows. A
  `YaraRule` compile failure logs `ERROR:yara` and marks the collection as
  errored. No hits is not evidence of absence: check the log.

  PHP-side rules (OOM, session, limits) need `log_errors=On`. PHP's built-in
  default is `log_errors=0` / `display_errors=1`, and the official Docker images
  ship no active php.ini, so there these errors only reach the HTTP response.
  php.ini-production and php.ini-development both set `log_errors = On`.

  Notes:

  - Logs only. Inventory/exposure is out of scope (Generic.Applications.PHPInventory).
  - Each YARA string captures its line, so the match is the evidence line.
    libyara limits: `Line` is capped at 511 bytes (512-byte match data), and a
    line is missed if the matched text starts more than ~1023 bytes into it.
  - Plain files are mmap-scanned in full. `.gz`/`.bz2` are streamed through the
    gzip/bzip2 accessors in small blocks: a line split across a block boundary
    can be missed or reported in part.
  - Container stdout/stderr is covered via Docker json-file, CRI pod and Podman
    logs on the host. Docker escapes `&` and `"` (`\u0026`, `\"`); rules allow both.
  - Set-Cookie leaks and `ClientIP` are also read from ModSecurity audit
    header lines and JSON access logs (`peerIp`, `remote_addr`, `client_ip`, ...).
  - journald files are scanned raw: `Line` is the data object (`MESSAGE=...`).
    Parse hits with Linux.Forensics.Journal.
  - Date filters apply to file Mtime, not line timestamps. Disclosure was
    2026-10-21; DateAfter=2026-10-20 bounds a fleet hunt.
  - `NumberOfHits` is a per-file budget across all rules. Rules report in
    declaration order (High first, noisy last); `HitLimitReached` marks rows
    from a file that exhausted it (that file's results are incomplete).
  - `UploadHits` uploads each file with at least one YARA match once and adds
    an `Upload` column to that file's rows.

reference:
  - https://github.com/0x4D31/honeypot-data/blob/main/reports/php2shell/2026-10-24-confirmed-rce.md
  - https://www.wiz.io/blog/php2shell-php-rce
  - https://github.com/9bie/php2shell-bypass-aslr-exp
  - https://github.com/0x4D31/honeypot-data/tree/main/reports/php2shell/2026-10-24-rce-evidence
  - https://github.com/KillaBoi/StealMyBitcoin-PoC

type: CLIENT

resources:
  timeout: 3600

parameters:
  - name: LogGlobs
    type: csv
    description: Log globs per OS (linux, windows, darwin). Directories and symlinks are skipped.
    default: |
      OS,Glob
      linux,"/var/log/{apache2,httpd,nginx,lighttpd,caddy,php-fpm,frankenphp}/**3"
      linux,"/var/log/php*"
      linux,"/var/log/php*/**2"
      linux,"/var/log/{syslog,messages,kern.log,daemon.log}*"
      linux,"/{var,run}/log/journal/*/*.journal"
      linux,"/usr/local/apache/{logs,domlogs}/**2"
      linux,"/usr/local/lsws/logs/*"
      linux,"/var/www/vhosts/*/logs/*"
      linux,"/var/www/vhosts/system/*/logs/*"
      linux,"/home/*/logs/*"
      linux,"/opt/bitnami/{apache,apache2,nginx,php}/logs/*"
      linux,"/opt/lampp/logs/*"
      linux,"/var/lib/docker/containers/*/*-json.log*"
      linux,"/var/log/pods/*/*/*.log*"
      linux,"/var/lib/containers/storage/overlay-containers/*/userdata/ctr.log"
      linux,"/var/lib/docker/overlay2/*/diff/var/log/{apache2,httpd,nginx,php-fpm}/*"
      linux,"/var/log/modsec_audit*"
      linux,"/var/log/modsecurity/**3"
      darwin,"/private/var/log/apache2/**2"
      darwin,"/{opt/homebrew,usr/local}/var/log/**2"
      darwin,"/Applications/MAMP/logs/*"
      darwin,"/Applications/XAMPP/xamppfiles/logs/*"
      windows,"C:/inetpub/logs/LogFiles/*/*.log"
      windows,"C:/Apache*/logs/*"
      windows,"C:/Program Files*/Apache Software Foundation/*/logs/*"
      windows,"C:/xampp/{apache,php}/logs/*"
      windows,"C:/wamp*/logs/*"
      windows,"C:/nginx*/logs/*"
      windows,"C:/php*/logs/*"
      windows,"C:/php*/*.log"
      windows,"C:/Program Files*/PHP*/**3/*.log"
      windows,"C:/Windows/Temp/php*.log"
  - name: AdditionalGlobs
    type: multiline
    default: ''
    description: Additional absolute log globs, one per line (custom virtual host, application or container log paths).
  - name: DateAfter
    type: timestamp
    description: Only scan files modified after this time (file Mtime). YYYY-MM-DDTHH:MM:SSZ
  - name: DateBefore
    type: timestamp
    description: Only scan files modified before this time (file Mtime). YYYY-MM-DDTHH:MM:SSZ
  - name: SizeMax
    type: int64
    description: Skip files larger than this many bytes on disk (empty/0 = no limit).
  - name: ScanCompressed
    type: bool
    default: Y
    description: Stream .gz/.bz2 rotated logs through the gzip/bzip2 accessors. Other archive types are skipped and listed in the collection log.
  - name: NumberOfHits
    type: int64
    default: 1000
    description: Per-file YARA hit budget across all rules (one hit = one matching string on one line).
  - name: ExcludeRegex
    type: regex
    default: '(?i)\b(ba)?sh: ([0-9]+: |line [0-9]+: )?\S*(sendmail|postdrop|msmtp|ssmtp)'
    description: Drop matched lines that also match this regex. Default drops PHP mail() without an MTA, a common container false positive.
  - name: IOCs
    type: csv
    description: Compiled to one YARA rule per row. Type ip = word-bounded literal, anything else = escaped literal. Rows containing quotes, backslashes or newlines are rejected and listed in the collection log.
    default: |
      Indicator,Type,Severity,Description
      15.204.59.70,ip,High,Confirmed RCE source (episode A); wget proof callback host :8081 (OVH US)
      162.35.99.94,ip,High,Confirmed RCE source (episode B); proof callback host :8080 and :80 (Interserver)
      144.48.4.242,ip,Medium,Exploit-shaped requests with PHP errors or worker crashes; no confirmed RCE
      104.28.208.84,ip,Low,Exploit-shaped requests; Cloudflare WARP egress (AS209242) - shared address
      /pwn-,text,Medium,Episode B proof callback path /pwn-target (seen on :8080 and :80)
      :8081/ok33,text,High,Episode A wget proof callback path
  - name: YaraRule
    type: yara
    description: Behaviour rules, ordered High to Low (yara() reports rules in declaration order and stops at NumberOfHits per file, so noisy rules go last). Each string is anchored on (^|[\n\x00]) so libyara emits one match per line. Start the text with a rule or import, otherwise Velociraptor first tries to parse it as yara shorthand. Keep the IOC marker comment where generated IOC rules are inserted.
    default: |
      rule PHP2Shell_PoC_QueryString : PHP2Shell
      {
          meta:
              description = "A1 heap-pressure request: 9bie exploit.py query constant ?q0000000=v..q0000004=v"
              severity = "High"
              stage = "A1"
          strings:
              $q = /(^|[\n\x00])[^\n\x00]{0,1024}q0000000=v[^\n\x00]{0,1024}/
          condition:
              $q
      }

      rule PHP2Shell_Shell_Stderr : PHP2Shell
      {
          meta:
              description = "Shell or cmd.exe error output in web/PHP logs: command executed by the PHP worker (system/popen stderr inherits the server error log)"
              severity = "High"
              stage = "B2"
          strings:
              $dash = /(^|[\n\x00])[^\n\x00]{0,1024}\bsh: [0-9]{1,5}: [^\n\x00]{0,512}(not found|cannot create|Permission denied|Read-only file system|No such file or directory)[^\n\x00]{0,1024}/
              $bash = /(^|[\n\x00])[^\n\x00]{0,1024}\b(ba)?sh: (line [0-9]{1,5}: )?[^\n\x00:]{1,256}: (command not found|Permission denied|Read-only file system|No such file or directory)[^\n\x00]{0,1024}/
              $ash  = /(^|[\n\x00])[^\n\x00]{0,1024}\bsh: [^\n\x00:]{1,256}: not found[^\n\x00]{0,1024}/
              $cmd  = /(^|[\n\x00])[^\n\x00]{0,1024}is not recognized as an internal or external command[^\n\x00]{0,1024}/
          condition:
              any of them
      }

      rule PHP2Shell_Chain_Cluster : PHP2Shell
      {
          meta:
              description = "Two pre-script OOMs within 256 KB of log with a startup input/multipart limit or invalid session ID warning nearby: exploit heap grooming, PoC-agnostic. Tags every matching line in the file"
              severity = "High"
              stage = "A1/B1/A2"
          strings:
              $oom = /(^|[\n\x00])[^\n\x00]{0,1024}Allowed memory size of [0-9]{1,20} bytes exhausted[^\n\x00]{0,256} in Unknown on line 0[^\n\x00]{0,1024}/
              $lim = /(^|[\n\x00])[^\n\x00]{0,1024}(Input variables exceeded [0-9]{1,10}|Maximum number of allowable file uploads has been exceeded|Multipart body parts limit exceeded|Session ID is too long or contains illegal characters)[^\n\x00]{0,1024}/
          condition:
              for any i in (1..#oom - 1) : (
                  @oom[i + 1] - @oom[i] < 262144 and
                  for any j in (1..#lim) : (
                      @lim[j] > @oom[i] - 262144 and @lim[j] < @oom[i + 1] + 262144
                  )
              )
      }

      rule PHP2Shell_Leak_SetCookie : PHP2Shell
      {
          meta:
              description = "PHPSESSID Set-Cookie holding percent-escaped bytes other than %2C: leaked worker memory (PHP URL-encodes the ID; valid IDs are [A-Za-z0-9,-]). Needs logs that record response headers (WAF audit, JSON access)"
              severity = "High"
              stage = "B1"
          strings:
              $c = /(^|[\n\x00])[^\n\x00]{0,1024}[Ss]et[-_]?[Cc]ookie[^\n\x00]{0,16}PHPSESSID=[^;\r\n\x00"]{0,512}%([013-9A-F][0-9A-F]|2[0-9ABDEF])[^\n\x00]{0,1024}/
          condition:
              $c
      }

      rule PHP2Shell_PreScript_OOM : PHP2Shell
      {
          meta:
              description = "memory_limit exhausted during request startup (in Unknown on line 0): A1/A2 heap-pressure stages"
              severity = "Medium"
              stage = "A1/A2"
          strings:
              // zend_alloc.c, all versions
              $mem = /(^|[\n\x00])[^\n\x00]{0,1024}Allowed memory size of [0-9]{1,20} bytes exhausted[^\n\x00]{0,256} in Unknown on line 0[^\n\x00]{0,1024}/
              // PHP <= 7.4 real-allocation failure (EOL branches, no upstream fix); not emitted by 8.x
              $oom = /(^|[\n\x00])[^\n\x00]{0,1024}Out of memory \(allocated [0-9]{1,20}\)[^\n\x00]{0,256} in Unknown on line 0[^\n\x00]{0,1024}/
          condition:
              any of them
      }

      rule PHP2Shell_Leak_Response : PHP2Shell
      {
          meta:
              description = "No-Referer/no-UA POST / or /index.php with >=800 KB response incl. headers (Apache %O): B1 PHPSESSID memory-disclosure response"
              severity = "Medium"
              stage = "B1"
          strings:
              $r = /(^|[\n\x00])[^\n\x00]{0,1024}\\?"POST \/(index\.php)?(\?[^"\\ \n]{0,512})? HTTP\/1\.[01]\\?" [0-9]{3} ([89][0-9]{5}|[1-9][0-9]{6,9}) \\?"-\\?" \\?"-\\?"[^\n\x00]{0,1024}/
          condition:
              $r
      }

      rule PHP2Shell_PreScript_Session : PHP2Shell
      {
          meta:
              description = "Session error during request startup (in Unknown on line 0): B1 upload-progress/session disclosure side effect"
              severity = "Medium"
              stage = "B1"
          strings:
              // B1 in all 35 honeypot cases: "PHP Request Startup: Session ID is too long or contains
              // illegal characters" (mod_files.c), "Failed to read/write session data"
              $s =/(^|[\n\x00])[^\n\x00]{0,1024}[Ss]ession[^\n\x00]{0,512} in Unknown on line 0[^\n\x00]{0,1024}/
          condition:
              $s
      }

      rule PHP2Shell_Multipart_Limits : PHP2Shell
      {
          meta:
              description = "Multipart/input limit warning at request startup: oversized multipart bodies (chain stages carry ~900-1000 parts)"
              severity = "Low"
              stage = "A1/B1/A2/B2"
          strings:
              $files = /(^|[\n\x00])[^\n\x00]{0,1024}Maximum number of allowable file uploads has been exceeded[^\n\x00]{0,1024}/
              $vars  = /(^|[\n\x00])[^\n\x00]{0,1024}Input variables exceeded [0-9]{1,10}[^\n\x00]{0,1024}/
              $parts = /(^|[\n\x00])[^\n\x00]{0,1024}Multipart body parts limit exceeded[^\n\x00]{0,1024}/
              $post  = /(^|[\n\x00])[^\n\x00]{0,1024}POST Content-Length of [0-9]{1,20} bytes exceeds the limit[^\n\x00]{0,1024}/
          condition:
              any of them
      }

      // IOC rules generated from the IOCs parameter are inserted here.

      rule PHP2Shell_Worker_Crash : PHP2Shell
      {
          meta:
              description = "PHP/web worker crash (SIGSEGV/SIGBUS/SIGABRT/SIGILL) or nginx losing its PHP upstream: chain crashes workers between stages and right after the shell starts (AH00051)"
              severity = "Low"
              stage = "B1/B2"
          strings:
              // APR signal names: SIGABRT is "Abort"
              $apache = /(^|[\n\x00])[^\n\x00]{0,1024}child pid [0-9]{1,10} exit signal (Segmentation fault|Bus error|Abort(ed)?|Illegal instruction)[^\n\x00]{0,1024}/
              // nginx in front of php-fpm or php -S: worker died before sending headers
              $nginx  = /(^|[\n\x00])[^\n\x00]{0,1024}(upstream prematurely closed (connection while reading response header|FastCGI (stdout|request))|recv\(\) failed \(104: Connection reset by peer\) while reading response header)[^\n\x00]{0,1024}/
              $fpm    = /(^|[\n\x00])[^\n\x00]{0,1024}child [0-9]{1,10} exited on signal (11 \(SIGSEGV|7 \(SIGBUS|6 \(SIGABRT|4 \(SIGILL)[^\n\x00]{0,1024}/
              // Kernel lines: FPM/CGI/LSAPI workers. Apache children run httpd's own
              // SIGSEGV handler (no kernel line; see $apache). arm64 logs only with
              // debug.exception-trace=1.
              $kernel = /(^|[\n\x00])[^\n\x00]{0,1024}\b(apache2|httpd|php-fpm[0-9.]{0,8}|php-cgi[0-9.]{0,8}|php[0-9.]{0,8}|lsphp[0-9.]{0,8}|frankenphp)\[[0-9]{1,10}\]: (segfault at |unhandled exception: )[^\n\x00]{0,1024}/
              $module = /(^|[\n\x00])[^\n\x00]{0,1024}(segfault at [0-9a-f]{1,16} ip [0-9a-f]{1,16} sp [0-9a-f]{1,16} error [0-9a-f]{1,8}|\]: unhandled exception: [^\n\x00]{0,512}) in (libphp|php)[^\n\x00]{0,1024}/
              $core   = /(^|[\n\x00])[^\n\x00]{0,1024}Process [0-9]{1,10} \((apache2|httpd|php[^)\n\x00]{0,24}|lsphp[^)\n\x00]{0,16}|frankenphp)\) of user [0-9]{1,10} (dumped core|terminated abnormally)[^\n\x00]{0,1024}/
          condition:
              any of them
      }

      rule PHP2Shell_Worker_Saturation : PHP2Shell
      {
          meta:
              description = "Worker pool exhausted: exploit.py --workers holds N-1 prefork children with stalled POSTs so the 4 chain requests reach one worker"
              severity = "Low"
              stage = "Pinning"
          strings:
              $apache = /(^|[\n\x00])[^\n\x00]{0,1024}server reached (MaxRequestWorkers|MaxClients) setting[^\n\x00]{0,1024}/
              $fpm    = /(^|[\n\x00])[^\n\x00]{0,1024}server reached pm\.max_children setting[^\n\x00]{0,1024}/
          condition:
              any of them
      }
  - name: UploadHits
    type: bool
    description: Upload each log file with at least one hit (whole file, can be large).

sources:
  - query: |
      LET Host <= SELECT OS FROM info()
      LET Platform = Host[0].OS

      -- File discovery.
      LET Patterns = SELECT Glob FROM LogGlobs WHERE OS = Platform
      LET ExtraPatterns = SELECT Line AS Glob FROM parse_lines(
          filename=AdditionalGlobs, accessor='data') WHERE Line
      LET CompressionOf(FileName) = if(condition=FileName =~ '''(?i)\.gz$''', then='gzip',
        else=if(condition=FileName =~ '''(?i)\.bz2$''', then='bzip2',
        else=if(condition=FileName =~ '''(?i)\.(xz|zst|lz4|lzma|zip|7z|tar)$''', then='unsupported',
        else='none')))
      LET StatusOf(FileSize, FileMtime, FileCompression) = if(condition=FileSize = 0, then='skipped_empty',
        else=if(condition=DateAfter AND FileMtime < DateAfter, then='skipped_before_date',
        else=if(condition=DateBefore AND FileMtime > DateBefore, then='skipped_after_date',
        else=if(condition=SizeMax AND FileSize > SizeMax, then='skipped_size',
        else=if(condition=FileCompression = 'unsupported', then='skipped_unsupported_compression',
        else=if(condition=FileCompression != 'none' AND NOT ScanCompressed, then='skipped_compressed',
        else='scan'))))))
      LET Files = SELECT OSPath, Name, Size, Mtime,
          CompressionOf(FileName=Name) AS Compression,
          StatusOf(FileSize=Size, FileMtime=Mtime,
            FileCompression=CompressionOf(FileName=Name)) AS Status
        FROM glob(globs=Patterns.Glob + ExtraPatterns.Glob, nosymlink=TRUE)
        WHERE NOT IsDir AND NOT IsLink
        GROUP BY OSPath

      -- IOC table -> one YARA rule per indicator, inserted at the marker comment.
      LET IOCMarker = '// IOC rules generated from the IOCs parameter are inserted here.'
      LET IOCTemplate = '''
      rule PHP2Shell_IOC_%v : PHP2Shell IOC
      {
          meta:
              description = "%v"
              severity = "%v"
              stage = "IOC"
              indicator = "%v"
          strings:
              $ioc = /(^|[\n\x00])[^\n\x00]{0,1024}%v[^\n\x00]{0,1024}/
          condition:
              $ioc
      }
      '''
      LET BadIOC = '''["\\\r\n]'''
      LET IOCPattern(Indicator, IndicatorType) = if(condition=IndicatorType = 'ip',
        then='''\b''' + regex_replace(source=Indicator, re='''\.''', replace='''\.''') + '''\b''',
        else=regex_replace(source=Indicator, re='''([^A-Za-z0-9])''', replace='''\${1}'''))
      LET IOCRows = SELECT count() AS Index, Indicator,
          if(condition=Type =~ '''(?i)^ip$''', then='ip', else='text') AS IndicatorType,
          if(condition=Severity =~ '''(?i)^(high|medium|low)$''', then=Severity,
            else='Medium') AS IndicatorSeverity,
          regex_replace(source=str(str=Description), re=BadIOC, replace=' ') AS IndicatorDescription
        FROM IOCs
        WHERE Indicator AND NOT Indicator =~ BadIOC
      LET IOCRules = SELECT format(format=IOCTemplate, args=[Index, IndicatorDescription,
          IndicatorSeverity, Indicator,
          IOCPattern(Indicator=Indicator, IndicatorType=IndicatorType)]) AS Rule
        FROM IOCRows
      -- IOCTemplate starts and ends with a newline, so plain concatenation is safe.
      LET IOCText <= join(array=IOCRules.Rule, sep='')
      LET RuleParts <= split(string=YaraRule, sep_string=IOCMarker)
      LET RuleText <= if(condition=len(list=RuleParts) > 1,
        then=RuleParts[0] + IOCText + join(sep=IOCMarker,
          array=slice(list=RuleParts, start=1, end=len(list=RuleParts))),
        else=YaraRule + IOCText)

      -- Line handling. Matches start on the anchoring \n or \x00 of the previous line.
      LET SevRank(S) = if(condition=S =~ '''(?i)^high$''', then=3,
        else=if(condition=S =~ '''(?i)^medium$''', then=2, else=1))
      LET RankSev(R) = if(condition=R >= 3, then='High',
        else=if(condition=R = 2, then='Medium', else='Low'))
      LET LeadRegex = '''^[\n\x00]'''
      LET TrimRegex = '''^[\n\x00]|[\r\x00-\x08]+$'''
      -- Apache error [client], nginx error client:, combined access (raw, Docker
      -- json, CRI), JSON access logs (plain or Docker-escaped keys).
      LET ClientIPRegex = (
        '''\[client (?P<ClientIP>[0-9A-Fa-f.:]+):[0-9]+\]''',
        '''client: (?P<ClientIP>[0-9A-Fa-f.:]+),''',
        '''^(?:\{"log":"|\S+ (?:stdout|stderr) [FP] )?(?P<ClientIP>[0-9A-Fa-f.:]{3,45}) \S+ \S+ \[''',
        '''\\?"(?:peerIp|remote_addr|remoteIp|remote_ip|client_ip|clientIp|clientip|src_ip)\\?"\s*:\s*\\?"(?P<ClientIP>[0-9A-Fa-f.:]{3,45})\\?"''')

      -- One YARA scan per file, materialized once as the foreach row's Raw column.
      -- Two END rows keep Raw a list: vfilter collapses a one-row subquery to a dict.
      LET ScanRows(Target, FileCompression) = SELECT * FROM chain(
        hits={
          SELECT Rule, Meta, String.Offset AS Offset, str(str=String.Data) AS Data
          FROM yara(rules=RuleText, number=NumberOfHits,
            files=if(condition=FileCompression = 'none', then=Target,
              else=pathspec(DelegateAccessor='auto', DelegatePath=str(str=Target))),
            accessor=if(condition=FileCompression = 'none', then='auto', else=FileCompression))
        },
        end1={ SELECT '' AS Rule, dict() AS Meta, 0 AS Offset, '' AS Data FROM scope() },
        end2={ SELECT '' AS Rule, dict() AS Meta, 0 AS Offset, '' AS Data FROM scope() })

      -- Per file: drop END rows and excluded lines, dedupe each rule per line
      -- (all strings of a line share its anchor offset), aggregate rules per line.
      LET KeptRows(Rows) = SELECT Rule, Meta.stage AS Stage,
          SevRank(S=Meta.severity) AS Rank,
          Offset + if(condition=Data =~ LeadRegex, then=1, else=0) AS LineOffset,
          regex_replace(source=Data, re=TrimRegex, replace='') AS Line,
          format(format='%v|%v', args=[Offset, Rule]) AS RuleKey
        FROM foreach(row=Rows)
        WHERE Rule AND NOT (ExcludeRegex AND Line =~ ExcludeRegex)
      LET RuleRows(Rows) = SELECT * FROM KeptRows(Rows=Rows) GROUP BY RuleKey
      LET LineRows(Rows) = SELECT LineOffset, Line,
          enumerate(items=Rule) AS Rules,
          enumerate(items=Stage) AS Stages,
          max(item=Rank) AS MaxRank
        FROM RuleRows(Rows=Rows)
        GROUP BY LineOffset

      -- One row per line. HitLimitReached: the file used its whole NumberOfHits budget.
      LET FileLines(Rows, Target, FileCompression, FileSize, FileMtime) = SELECT
          Platform AS OS, RankSev(R=MaxRank) AS Severity, Rules, Stages,
          parse_string_with_regex(string=Line, regex=ClientIPRegex).ClientIP AS ClientIP,
          Line, Target AS OSPath, LineOffset, FileCompression AS Compression,
          FileSize, FileMtime,
          len(list=Rows) - 2 >= NumberOfHits AS HitLimitReached
        FROM LineRows(Rows=Rows)
        ORDER BY LineOffset

      -- Coverage goes to the collection log (no second table). Candidate files
      -- are materialized once and reused for scanning.
      LET FileRows <= SELECT * FROM Files
      LET StatusCounts = SELECT Status, count() AS Count FROM FileRows GROUP BY Status
      LET StatusTexts <= SELECT format(format='%v=%v', args=[Status, Count]) AS T FROM StatusCounts
      LET Gaps <= SELECT format(format='%v (%v)', args=[OSPath, Status]) AS T
        FROM FileRows
        WHERE Status =~ '^skipped_(size|unsupported_compression|compressed)$'
        LIMIT 50
      LET IOCRuleRows <= SELECT Indicator FROM IOCRows
      LET RejectedIOCs <= SELECT Indicator FROM IOCs WHERE Indicator =~ BadIOC
      LET LogSummary <= log(dedup=-1,
        message='PHP2Shell coverage: %v candidate logs from %v globs (%v); %v IOC rules. PHP-side rules need log_errors=On. No hits is not absence.',
        args=[len(list=FileRows), len(list=Patterns.Glob + ExtraPatterns.Glob),
          join(array=StatusTexts.T, sep=', '), len(list=IOCRuleRows)])
      LET LogGaps <= if(condition=Gaps, then=log(dedup=-1,
        message='PHP2Shell coverage gaps, not scanned: %v',
        args=[join(array=Gaps.T, sep='; ')]))
      LET LogRejected <= if(condition=RejectedIOCs, then=log(dedup=-1,
        message='PHP2Shell IOC rows rejected (quote, backslash or newline): %v',
        args=[join(array=RejectedIOCs.Indicator, sep=', ')]))

      -- Raw is evaluated once per file (one scan). With UploadHits, a one-row inner
      -- foreach uploads each file with at least one YARA match once (count() does
      -- not reset per foreach iteration, so it cannot pick a file's first row).
      SELECT * FROM foreach(
        row={
          SELECT OSPath, Compression, Size, Mtime,
            { SELECT * FROM ScanRows(Target=OSPath, FileCompression=Compression) } AS Raw
          FROM FileRows
          WHERE Status = 'scan'
        },
        query={
          SELECT * FROM if(condition=UploadHits,
            then={
              SELECT * FROM foreach(
                row={
                  SELECT if(condition=len(list=Raw) > 2,
                    then=upload(file=OSPath)) AS Upload
                  FROM scope()
                },
                query={
                  SELECT *, Upload FROM FileLines(Rows=Raw, Target=OSPath,
                    FileCompression=Compression, FileSize=Size, FileMtime=Mtime)
                })
            },
            else={
              SELECT * FROM FileLines(Rows=Raw, Target=OSPath,
                FileCompression=Compression, FileSize=Size, FileMtime=Mtime)
            })
        })
````



