# How do I enable password protected VFS downloads?

You can just export them from the GUI!

Set the password in your user preferences you can enable password
protected exports.

Highlight the directory you want to export.

![image](https://github.com/Velocidex/velociraptor-docs/assets/13081800/db252e10-cebb-4bdb-b4aa-c668324ccf6f)

Hit the export button - this will start a server collection to take a
snapshot of the vfs - you can set any filtering globs (so for example
don't export all the files - maybe only `*.exe`).

![image](https://github.com/Velocidex/velociraptor-docs/assets/13081800/4e55b375-96f9-4a47-a9ce-7af515bedc64)

By default it just does `**` which is everything under the directory.
This makes a collection and adds a link to it.

![image](https://github.com/Velocidex/velociraptor-docs/assets/13081800/bee00c29-5df9-495a-81f6-465f7e954104)

Then click that and export like any other collection.

![image](https://github.com/Velocidex/velociraptor-docs/assets/13081800/a0eceb4b-0fa4-4c4f-bd75-d37897827d75)

Password can be set in the user preferences (the top right tile
with the username).  This will enable the lock feature of the zip
export - make sure to click close button to save the password (instead
of just clicking outside the modal dialog).

![image](https://github.com/Velocidex/velociraptor-docs/assets/13081800/34fe6fa9-facd-4545-bccc-0c4d731cb18c)


Tags: #password #download #gui
