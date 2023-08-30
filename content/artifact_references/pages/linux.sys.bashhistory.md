---
title: Linux.Sys.BashHistory
hidden: true
tags: [Client Artifact]
---

This artifact enables grep of Bash and alternate shell history files.

It can also be used to target other files located in the user profile such as
*_profile and *rc files.
shell history: /{root,home/*}/.*_history
profile: /{root,home/*}/.*_profile
*rc file: /{root,home/*}/.*rc

tags: .bash_history .bash_profile .bashrc


<pre><code class="language-yaml">
name: Linux.Sys.BashHistory
author: &quot;Matt Green - @mgreen27&quot;
description: |
  This artifact enables grep of Bash and alternate shell history files.

  It can also be used to target other files located in the user profile such as
  *_profile and *rc files.
  shell history: /{root,home/*}/.*_history
  profile: /{root,home/*}/.*_profile
  *rc file: /{root,home/*}/.*rc

  tags: .bash_history .bash_profile .bashrc


parameters:
  - name: TargetGlob
    default: /{root,home/*}/.*_history
  - name: SearchRegex
    type: regex
    description: &quot;Regex of strings to search in line.&quot;
    default: &#x27;.&#x27;
  - name: WhitelistRegex
    type: regex
    description: &quot;Regex of strings to leave out of output.&quot;
    default:

sources:
  - query: |
      LET files = SELECT OSPath FROM glob(globs=TargetGlob)

      SELECT * FROM foreach(row=files,
          query={
              SELECT Line, OSPath FROM parse_lines(filename=OSPath)
              WHERE
                Line =~ SearchRegex
                AND NOT if(condition= WhitelistRegex,
                    then= Line =~ WhitelistRegex,
                    else= FALSE)
          })

</code></pre>

