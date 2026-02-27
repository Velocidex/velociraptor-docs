Output ./self-signed-generation.gif
# Output ./self-signed-generation.txt
# Output ./self-signed-generation.mp4

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
Type "PS1='\[\033[1;34m\]user@computer \[\033[1;32m\]~ \[\033[1;34m\]$ \[$(tput sgr0)\]'"
Enter
Type "alias velociraptor='/home/me/projects/velociraptor/output/velociraptor-v0.73.3-linux-amd64'"
Enter
Type "clear"
Enter
Sleep 1s
Show
Sleep 1s

# Type a command in the terminal.
Type "velociraptor config generate -i"
Sleep 2s
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 3s
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Backspace 9
Type "192.168.1.1"
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 1s
Type "admin"
Enter
Sleep 1s
Type "MYverylongC0MPL3Xpassword"
Enter
Sleep 1s
Enter
Sleep 1s
Enter
Sleep 3s
Enter
Type "ls *.yaml"
Enter

# Admire the output for a bit.
Sleep 3s

# If we needed a screenshot then this would be the best time to do it.
# Screenshot ./self-signed-generation.png

# Cleanup
Hide
Type "rm -v server.config.yaml"
Enter
