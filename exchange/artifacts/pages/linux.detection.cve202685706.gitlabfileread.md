# Linux.Detection.CVE202685706.GitLabFileRead

Hunts self-managed GitLab hosts for exploitation of CVE-2026-85706, an
unauthenticated arbitrary file read in the repository upload endpoints
(CVSS 10.0, CISA KEV 2026-09-11, flagged for forensic triage under
BOD 26-04). Patching alone does not answer whether files were read first.
This artifact answers that from the host's own logs.

## The indicator

The vulnerable handlers read the raw client-supplied `file.path` parameter.
A legitimate accelerated upload never carries a client-supplied `file.path`:
GitLab Workhorse buffers the body, injects `file.path` itself pointing at a
temp file under the Rails uploads directory, and always pairs it with a
`file.gitlab-workhorse-upload` token parameter. So a `file.path` on an
`/api/v4/projects/` route without that token is the reliable indicator.

## What NOT to hunt for

Do not key on `../`, on the literal string `commits`, or on `/repository/`.
The exploit passes an ABSOLUTE path, so no traversal sequence exists, and
five request spellings were confirmed to reach the vulnerable handler. Only
three of them contain percent-encoding:

    /repository/%66iles/x      encoded segment
    /%72epository/files/x      the repository segment encodes too
    /repository/%63ommits      encoded segment
    /repository/commits/       trailing slash, no encoding
    /repository/commits.json   suffix, no encoding

## Risk classification

| Level    | Evidence |
|----------|----------|
| CRITICAL | 400 with an oversized body. File content was returned to the caller. |
| HIGH     | 400 "branch is required". The file existed and was read. Nothing returned. |
| MEDIUM   | 400 "local file not present" (enumeration) or 500 (read denied by permissions). |
| INFO     | 401. The attempt was blocked because the host was already patched. |

A 400 is not a failure. "branch is required" means the file's bytes were
read and parsed into request parameters, which was confirmed by planting
files with known contents and watching the error message change.


---

````yaml
name: Linux.Detection.CVE202685706.GitLabFileRead
author: Eric Capuano (https://bsky.app/profile/eric.zip)
description: |
  Hunts self-managed GitLab hosts for exploitation of CVE-2026-85706, an
  unauthenticated arbitrary file read in the repository upload endpoints
  (CVSS 10.0, CISA KEV 2026-09-11, flagged for forensic triage under
  BOD 26-04). Patching alone does not answer whether files were read first.
  This artifact answers that from the host's own logs.

  ## The indicator

  The vulnerable handlers read the raw client-supplied `file.path` parameter.
  A legitimate accelerated upload never carries a client-supplied `file.path`:
  GitLab Workhorse buffers the body, injects `file.path` itself pointing at a
  temp file under the Rails uploads directory, and always pairs it with a
  `file.gitlab-workhorse-upload` token parameter. So a `file.path` on an
  `/api/v4/projects/` route without that token is the reliable indicator.

  ## What NOT to hunt for

  Do not key on `../`, on the literal string `commits`, or on `/repository/`.
  The exploit passes an ABSOLUTE path, so no traversal sequence exists, and
  five request spellings were confirmed to reach the vulnerable handler. Only
  three of them contain percent-encoding:

      /repository/%66iles/x      encoded segment
      /%72epository/files/x      the repository segment encodes too
      /repository/%63ommits      encoded segment
      /repository/commits/       trailing slash, no encoding
      /repository/commits.json   suffix, no encoding

  ## Risk classification

  | Level    | Evidence |
  |----------|----------|
  | CRITICAL | 400 with an oversized body. File content was returned to the caller. |
  | HIGH     | 400 "branch is required". The file existed and was read. Nothing returned. |
  | MEDIUM   | 400 "local file not present" (enumeration) or 500 (read denied by permissions). |
  | INFO     | 401. The attempt was blocked because the host was already patched. |

  A 400 is not a failure. "branch is required" means the file's bytes were
  read and parsed into request parameters, which was confirmed by planting
  files with known contents and watching the error message change.

reference:
  - https://www.cve.org/CVERecord?id=CVE-2026-85706
  - https://www.cisa.gov/known-exploited-vulnerabilities-catalog
  - https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-3-2-released/
  - https://watchtowr.com/resources/rapid-reaction-gitlab-critical-path-traversal-vulnerability-cve-2026-85706/

type: CLIENT

precondition: SELECT OS FROM info() WHERE OS = 'linux'

parameters:
  - name: NginxLogGlob
    type: string
    description: GitLab nginx access logs, including rotated copies.
    default: /var/log/gitlab/nginx/gitlab_access.log*
  - name: ApiJsonGlob
    type: string
    description: GitLab Rails structured API logs, including rotated copies.
    default: /var/log/gitlab/gitlab-rails/api_json.log*
  - name: VersionGlob
    type: string
    description: Path to the installed GitLab VERSION file.
    default: /opt/gitlab/embedded/service/gitlab-rails/VERSION
  - name: DisclosureByteThreshold
    type: int
    description: >
      Response size above which a 400 is treated as content disclosure.
      Ordinary error bodies measured 35-81 bytes in testing; a leaked
      configuration file measured 1708.
    default: 200

sources:
  - name: VersionAssessment
    description: Installed version, and whether it falls in the affected range.
    query: |
      LET raw = SELECT OSPath,
                       strip(string=read_file(filename=OSPath, length=32)) AS Version
        FROM glob(globs=VersionGlob)

      LET parsed = SELECT OSPath, Version,
             split(string=Version, sep="\\.") AS P
        FROM raw

      LET numeric = SELECT OSPath, Version,
             atoi(string=get(item=P, field="0")) * 1000000 +
             atoi(string=get(item=P, field="1")) * 1000 +
             atoi(string=get(item=P, field="2")) AS N
        FROM parsed

      SELECT OSPath, Version, N AS VersionOrdinal,
             if(condition=(N >= 18007000 AND N < 19001008) OR
                          (N >= 19002000 AND N < 19002006) OR
                          (N >= 19003000 AND N < 19003002),
                then="VULNERABLE",
                else="PATCHED OR NOT AFFECTED") AS Assessment
      FROM numeric

  - name: ExploitAttempts
    description: Client request lines carrying a file.path parameter, risk-scored.
    query: |
      LET hits = SELECT OSPath, Line,
             parse_string_with_regex(
               string=Line,
               regex=['''^(?P<ClientIP>\S+) \S+ \S+ \[(?P<Ts>[^\]]+)\] "(?P<Method>\S+) (?P<Uri>\S+) [^"]*" (?P<Status>\d+) (?P<Bytes>\d+) "(?P<Referer>[^"]*)" "(?P<UserAgent>[^"]*)"''']) AS P
      FROM foreach(
        row={ SELECT OSPath FROM glob(globs=NginxLogGlob) },
        query={ SELECT OSPath, Line FROM parse_lines(filename=OSPath) })
      WHERE Line =~ '''/api/v4/projects/''' AND Line =~ '''file\.path='''

      SELECT OSPath, P.ClientIP AS ClientIP, P.Ts AS Timestamp,
             P.Method AS Method, P.Uri AS Uri,
             atoi(string=P.Status) AS Status,
             atoi(string=P.Bytes) AS RespBytes,
             P.UserAgent AS UserAgent,
             if(condition=P.Status = "401", then="INFO",
             else=if(condition=P.Status = "500", then="MEDIUM",
             else=if(condition=P.Status = "404", then="MEDIUM",
             else=if(condition=atoi(string=P.Bytes) > DisclosureByteThreshold,
                     then="CRITICAL", else="HIGH")))) AS Risk,
             if(condition=P.Status = "401",
                then="Blocked. Host was already patched.",
             else=if(condition=P.Status = "500",
                then="File existed. Read denied by permissions.",
             else=if(condition=P.Status = "404",
                then="Reached Rails. Project not resolved.",
             else=if(condition=atoi(string=P.Bytes) > DisclosureByteThreshold,
                     then="Content returned to caller.",
                     else="Reached vulnerable handler.")))) AS Finding
      FROM hits

  - name: RailsApiEvidence
    description: Rails API events where file.path was client-supplied, with the target file.
    query: |
      LET events = SELECT OSPath, parse_json(data=Line) AS E
      FROM foreach(
        row={ SELECT OSPath FROM glob(globs=ApiJsonGlob) },
        query={ SELECT OSPath, Line FROM parse_lines(filename=OSPath) })
      WHERE Line =~ '''file\.path'''

      LET flat = SELECT OSPath,
             E.time AS Timestamp, E.remote_ip AS RemoteIP, E.status AS Status,
             E.path AS RawPath, E.route AS ResolvedRoute,
             E.correlation_id AS CorrelationId, E.ua AS UserAgent,
             join(array=filter(list=E.params,
                  condition="x=>x.key = 'file.path'").value, sep=",") AS TargetFile,
             len(list=filter(list=E.params,
                  condition="x=>x.key = 'file.gitlab-workhorse-upload'")) AS WorkhorseToken
      FROM events

      SELECT Timestamp, RemoteIP, Status, TargetFile, RawPath, ResolvedRoute,
             CorrelationId, UserAgent,
             if(condition=Status = 401, then="INFO",
             else=if(condition=Status = 500, then="MEDIUM",
             else=if(condition=Status = 404, then="MEDIUM",
             else="HIGH"))) AS Risk
      FROM flat
      WHERE WorkhorseToken = 0
      LIMIT 1000

  - name: TargetedFiles
    description: Which files were asked for, by whom, and how often.
    query: |
      LET events = SELECT parse_json(data=Line) AS E
      FROM foreach(
        row={ SELECT OSPath FROM glob(globs=ApiJsonGlob) },
        query={ SELECT OSPath, Line FROM parse_lines(filename=OSPath) })
      WHERE Line =~ '''file\.path'''

      LET flat = SELECT E.remote_ip AS RemoteIP, E.status AS Status,
             join(array=filter(list=E.params,
                  condition="x=>x.key = 'file.path'").value, sep=",") AS TargetFile,
             len(list=filter(list=E.params,
                  condition="x=>x.key = 'file.gitlab-workhorse-upload'")) AS WorkhorseToken
      FROM events WHERE WorkhorseToken = 0

      SELECT TargetFile, RemoteIP,
             count() AS Attempts,
             enumerate(items=Status) AS StatusCodes
      FROM flat
      GROUP BY TargetFile, RemoteIP
````



