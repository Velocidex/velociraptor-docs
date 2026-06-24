name: MacOS.Forensics.ASL

author: Yogesh Khatri (@swiftforensics), CyberCX

description: | 
   This artifact parses the ASL (Apple System Log) v2 files located at 
   /private/var/log/asl/*.asl

reference:
- https://github.com/apple-oss-distributions/Libc/blob/Libc-825.25/gen/asl_file.h

type: CLIENT

parameters:
   - name: GlobTable
     type: csv
     default: |
        Glob
        /private/var/log/asl/*.asl
   - name: PathRegex
     description: Filter the path by this regexp
     default: .
   - name: SenderRegex
     description: Filter the Sender by this regexp
     default: .
   - name: MessageRegex
     description: Filter the Message by this regexp
     default: .
   - name: KeyValueRegex
     description: Filter the Keys and Values by this regexp
     default: .
   - name: DateAfter
     type: timestamp
     description: "fetch logs after this date. YYYY-MM-DDTmm:hh:ssZ"
   - name: DateBefore
     type: timestamp
     description: "fetch logs before this date. YYYY-MM-DDTmm:hh:ssZ"

export: |
    LET AslProfile = '''[
    ["Header", 0, [
      ["Cookie", 0, "String", {
         "length": 12
      }],
      ["Version", 12, "uint32b"],
      ["First", 16, "uint64b"],
      ["Time", 24, "Timestamp", {
          type: "uint64b"
      }],
      ["Last", 37, "uint64b"],
      ["Items", "x=>x.First", "Array", {
          count: 10000,
          max_count: 10000,
          type: Message,
          sentinel: "x=>x.Last = x.StartOf",
      }],
    ]],
    ["Message", "x=>x.Next - x.StartOf", [
      ["Zero", 0, "uint16b"],
      ["Len", 2, "uint32b"],
      ["Next", 6, "uint64b"],
      ["ID", 14, "uint64b"],
      ["Time", 22, "Timestamp", {
          type: "uint64b"
      }],
      ["Nano", 30, "uint32b"],
      ["Level", 34, "Enumeration", {
          "type": "uint16b",
          "map": {
              "Emergency" : 0x00000000,
              "Alert"     : 0x00000001, 
              "Critical"  : 0x00000002, 
              "Error"     : 0x00000003, 
              "Warning"   : 0x00000004, 
              "Notice"    : 0x00000005, 
              "Info"      : 0x00000006, 
              "Debug"     : 0x00000007,
          }
      }],
      ["Flags", 36, "uint16b"],
      ["PID", 38, "int32b"],
      ["UID", 42, "int32b"],
      ["GID", 46, "int32b"],
      ["RUID", 50, "int32b"],
      ["RGID", 54, "int32b"],
      ["RefPID", 58, "uint32b"],
      ["KVCount", 62, "uint32b"],
      ["Host", 66, "AslString"],
      ["Sender", 74, "AslString"],
      ["Facility", 82, "AslString"],
      ["Message", 90, "AslString"],
      ["RefProc", 98, "AslString"],
      ["Session", 106, "AslString"],
      ["KeyValues", 114, "Array", {
          count: "x=>x.KVCount/2",
          max_count: 25,
          type: KeyValuePair,
      }],
    ]],
    ["KeyValuePair", 16, [
      ["Key", 0, "AslString"],
      ["Val", 8, "AslString"],
      ["Pair", 0, "Value", { 
        "value": "x=>format(format='{%s:%s}', args=[x.Key.Info.str, x.Val.Info.str])",
      }],
    ]],
    ["AslString", 8, [
      ["z", 0, "int64b"],
      ["s", 0, "Value", { "value": "x=>if(condition=(x.z < 0), 
                                        then='INTERNAL', 
                                        else='EXTERNAL' )"
      }],
      ["Info", 0, "Union", {
         selector: "x=>x.s",
         choices: {
             "INTERNAL": "IntString",
             "EXTERNAL": "ExtString",
         }
      }],
    ]],
    ["IntString", 8, [
      ["z", 0, "uint8b"],
      ["actuallen", 0, "Value", { "value": "x=>if(condition=(x.z=0), 
                                                then=0, 
                                                else=x.z - 128)"
      }],
      ["str", 1, "String", { encoding: "utf8", length: "x=>x.actuallen" }],
    ]],
    ["ExtString", 8, [
      ["Offset", 0, "uint64b"],
      ["Str", 0, "Profile", {
          type: "ExtString2",
          offset: "x=>x.Offset",
      }],
      ["str", 0, "Value", { "value": "x=>x.Str.str" }],
    ]],
    ["ExtString2", "x=>x.len + 6", [
      ["one", 0, "uint16b"],
      ["len", 2, "uint32b"],
      ["str", 6, "String", { encoding: "utf8", length: "x=>x.len" }],
    ]],
    ]'''

precondition: SELECT OS From info() where OS = 'darwin'

sources:
  - query: |
      LET files = SELECT OSPath, Mtime, Btime
        FROM glob(globs=GlobTable.Glob)
        WHERE   log(message=OSPath)

      SELECT * FROM foreach(row=files,
        query={
            SELECT ID, Time, Level, PID, UID, GID, RUID, RGID, RefPID, //KVCount, 
                    Host.Info.str as Host, 
                    Sender.Info.str as Sender,
                    Facility.Info.str as Facility,
                    Message.Info.str as Message,
                    RefProc.Info.str as RefProc,
                    Session.Info.str as Session,
                    KeyValues.Pair as KeyValues,
                    OSPath as SourcePath
                    //OSPath.Basename as SourceFile
            FROM 
                foreach(row=parse_binary(
                    filename=read_file(filename=OSPath, length=1000000),
                    accessor="data",
                    profile=AslProfile, struct="Header").Items)
            WHERE   if(condition=DateAfter, then= Time > DateAfter, else= True )
                AND if(condition=DateBefore, then= Time < DateBefore, else= True )
        })
        WHERE EntryPath =~ PathRegex
            AND Sender =~ SenderRegex
            AND Message =~ MessageRegex
            AND KeyValues =~ KeyValueRegex
