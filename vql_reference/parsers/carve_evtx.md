# carve_evtx



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
filename|The file or device to carve (e.g. 'C:' with the 'ntfs' accessor, or C:/pagefile.sys with the ntfs accessor).|OSPath (required)
accessor|The accessor to use.|string
messagedb|A Message database from https://github.com/Velocidex/evtx-data.|string
start_offset|Start carving at this offset (default 0).|int64
end_offset|Stop carving at this offset (default end of file).|int64
output|If set, also write the recovered chunks to a new EVTX file at this path so they can be opened with Event Viewer. Each chunk is written once.|string

**Required permissions:** `FILESYSTEM_READ`, `FILESYSTEM_WRITE`

### Description

Carve EVTX chunks from a file or device and parse their event records.

When event logs are cleared or deleted, the old data often remains
on disk until it is overwritten. This plugin scans any file or
device (for example a raw volume, unallocated space, the pagefile
or a memory image) for the EVTX chunk signature at any offset and
parses each chunk it finds. Each 64kb chunk carries its own string
and template tables, so its records can be parsed without the rest
of the log file.

Each row has the same structure as `parse_evtx()` with these
additional columns:

- `ChunkOffset`: The offset of the chunk in the carved file.
- `ChunkHeaderValid`: The chunk header checksum is correct.
- `ChunkDataValid`: The event records checksum is correct.
- `ChunkTruncated`: The file ended before the end of the chunk.
- `ChunkCompressed`: The chunk was found inside an NTFS compressed
  file and was decompressed. Windows compresses the event logs by
  default, so most chunks carved from a raw volume are compressed.

Carved records may be incomplete or partially overwritten. Records
from chunks with invalid checksums should be treated with caution.
The same chunk may be found several times (for example in a live
log file and in unallocated space).

### Example

```vql
SELECT ChunkOffset, ChunkHeaderValid,
       System.TimeCreated.SystemTime AS Timestamp,
       System.EventID.Value AS EventID,
       System.Channel AS Channel, EventData
FROM carve_evtx(filename="C:", accessor="ntfs")
WHERE EventID IN (1102, 104, 4624, 7045)
```

To carve the pagefile on a running system use the `ntfs` accessor:

```vql
SELECT * FROM carve_evtx(filename="C:/pagefile.sys", accessor="ntfs")
```

### Saving the recovered events

Set `output` to also write the recovered chunks to a new EVTX
file that can be opened with Event Viewer, `parse_evtx()` or any
other EVTX tool. This requires the `FILESYSTEM_WRITE` permission.
Write it to a different disk than the one being carved: writing
to the same disk can overwrite the deleted data being recovered.

- Each chunk is written once, even if it was found several times.
- Windows refuses to open a file containing any chunk with a bad
  checksum. Damaged chunks are therefore cut down to their leading
  intact records, and their checksums are recomputed.
- Windows stops reading when the record numbers in the chunk
  headers do not follow on from each other, so the chunk headers
  are renumbered. The event record ids of the events are not
  changed.

```vql
SELECT count() AS Events
FROM carve_evtx(filename="C:", accessor="ntfs",
                output="C:/cases/recovered.evtx")
GROUP BY 1
```



