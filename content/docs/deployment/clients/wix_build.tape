Output ./wix_build.gif
Output ./wix_build.mp4

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
Type "ssh windoze"
Enter
Sleep 2s
Type "prompt"
Enter
Type "cd Downloads\wix"
Enter
Type "cls"
Enter
Sleep 1s
Show

Sleep 1s

# Type a command in the terminal.
Type "build_amd64.bat"

# Pause for dramatic effect...
Sleep 2s

# Run the command by pressing enter.
Enter

Sleep 10s
Screenshot ./wix_build.png

# Admire the output for a bit.
Sleep 10s

Type "dir *.msi"
Enter

Sleep 2s

Hide
Type "exit"
Enter
