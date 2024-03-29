---
title: Windows.Collectors.File
hidden: true
tags: [Client Artifact]
---

Using Windows.Collectors.File is deprecated. Please use
Generic.Collectors.File instead.


```yaml
name: Windows.Collectors.File
description: |
    Using Windows.Collectors.File is deprecated. Please use
    Generic.Collectors.File instead.
parameters:
  - name: collectionSpec
    description: |
       A CSV file with a Glob column with all the globs to collect.
       NOTE: Globs must not have a leading device.
    type: csv
    default: |
       Glob
       Users\*\NTUser.dat
  - name: Root
    description: |
      On Windows, this is the device to apply all the glob on. On *NIX,
      this should be a path to a subdirectory but must not be a real
      device from /dev.
    default: "C:"
  - name: Accessor
    default: lazy_ntfs
    description: |
      On Windows, this can be left on `lazy_ntfs'. For *NIX, this value
      must be set to `file' since the ntfs accessors are not available.
  - name: Separator
    description: |
      The path separator used to construct the final globs from the root
      and the partial globs in `collectionSpec'.
    default: "\\"

sources:
   - name: Forward query to new Artifact
     queries:
      - SELECT * FROM Artifact.Generic.Collectors.File(Accessor=Accessor,
          collectionSpec=collectionSpec, Root=Root, Separator=Separator)
          WHERE log(message="Using Windows.Collectors.File is deprecated. Use Generic.Collectors.File instead.")

```
