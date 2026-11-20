# Linux.Sys.APTHistory

APT (Advanced Package Tool) maintains a log of software installation/removal/upgrades, as well as associated command-line invocations.

This artifact parses the APT `history.log`, as well as archived history logs to provide this information.


---

````yaml
name: Linux.Sys.APTHistory
description: |
   APT (Advanced Package Tool) maintains a log of software installation/removal/upgrades, as well as associated command-line invocations.
   
   This artifact parses the APT `history.log`, as well as archived history logs to provide this information.

# Can be CLIENT, CLIENT_EVENT, SERVER, SERVER_EVENT
type: CLIENT

parameters:
   - name: APTHistoryLogs
     default: /var/log/apt/history.log*
     description: APT history log(s)
   
sources:
  - precondition:
      SELECT OS From info() where OS = 'linux'

    query: |
      LET APTHistoryList = SELECT OSPath,
          if(condition=OSPath.Basename =~ "\\.gz$",
             then="gzip",
             else="auto") AS Accessor
      FROM glob(globs=split(string=APTHistoryLogs, sep=","))

      LET ParseRecords = SELECT OSPath,
          parse_string_with_regex(
              string=Record,
              regex=['Start-Date:\\s(?P<StartDate>.+)',
                     'Commandline:\\s(?P<CommandLine>.+)',
                     'Requested-By:\\s(?P<RequestedBy>.+)',
                     'Install:\\s(?P<Install>.+)',
                     'Remove:\\s(?P<Remove>.+)',
                     'Upgrade:\\s(?P<Upgrade>.+)',
                     'End-Date:\\s(?P<EndDate>.+)']) AS Event
      FROM parse_records_with_regex(
          accessor=Accessor,
          file=OSPath,
          regex='''(?sm)^(?P<Record>Start-Date:.+?)\n\n''')

      SELECT * FROM foreach(row=APTHistoryList, query=ParseRecords)````



