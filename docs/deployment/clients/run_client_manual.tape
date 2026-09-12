Output ./run_client_manual.gif
# Output ./run_client_manual.mp4

# Settings:
Set Shell bash
Set FontSize 16
Set FontFamily "Iosevka Term"
Set Height 800
Set Width 1200
Set LetterSpacing 1.0
Set LoopOffset 0
Set Theme "deep"
Set PlaybackSpeed 1.0
Set Margin 0
Set Padding 20
# Set MarginFill "#ffffff"
# Set BorderRadius 10

# Setup
Hide
Type "PS1='\[\033[1;34m\]root@computer \[\033[1;32m\]~ \[\033[1;34m\]# \[$(tput sgr0)\]'"
Enter
Type "alias velociraptor='/home/me/projects/velociraptor/output/velociraptor-v0.73.3-linux-amd64'"
Enter
Type "find /tmp -type f -iname 'Velociraptor.writeback*' -delete"
Enter
Type "sed -i 's|/home/me/Sync/zxcv/servers/velociraptor/datastore3|/tmp|g' ./client.config.yaml"
Enter
Type "clear"
Enter
Sleep 1s
Show
Sleep 1s

# Type a command in the terminal.
Type "velociraptor --config client.config.yaml client -v"

# Pause for dramatic effect...
Sleep 2s

Set PlaybackSpeed 0.5

# Run the command by pressing enter.
Enter

# Sleep 565ms
# If we needed a screenshot then this would be the best time to do it.
# Screenshot ./run_client_manual.png

# Admire the output for a bit.
Sleep 3s
