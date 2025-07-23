# How can I analyse a raw disk image?

Velociraptor is primarily a live analysis tool. However traditional
forensics calls for the acquisition of raw disk images to preserve
evidence.

In most incident response use cases it is very rare to acquire a raw
disk image - modern disks are simply too large for this to be
useful. Also physical storage devices, such as SSD implement TRIM
protocols making it very unlikely to recover deleted data.

However sometimes (more commonly in cloud VM analysis), it is possible
to encounter a raw disk image in one of the popular image formats:

* `EWF` images will have the `.e01`, `.e02` etc extension.
* `VMDK` (VMware Disk) images will have the `.vmdk` extension
* `VHDX` (Usually Microsoft images) will have the `.vhdx` extension
* `Raw` images (sometimes called the `dd` images)

Velociraptor can read all the above image types and supports parsing
data from images as opposed to the live system by using a mechanism
called [Accessor Remapping]({{< ref
"/docs/forensic/filesystem/remapping/" >}}).

You can read the details in the link above but put simply, remapping
is a way to specify how Velociraptor should open specific files. The
`Remapping Configuration` tells Velociraptor how to map IO requests
from VQL queries into the disk image instead of calling the OS APIs on
the analysis system itself.

Once a remapping file is created, you just need to start a client
using this remapping file. The new `virtual client` appears like a
regular client, except that all IO requests come from the disk image.

## TLDR: How to analyse disk images, just tell me

The following will work in most simple cases - namely a disk or
partition image of a Windows system, stored at the `C:` drive.

1. In the Velociraptor GUI, navigate to `Server Artifacts` in the sidebar menu.
2. Create a new collection by clicking the `New Collection` button.
3. Select the `Server.Utils.DeadDiskClient` artifact and configure the
   path to the image in the artifact parameters.

![Artifact Parameters](artifact_parameters.png)

The `Hostname` parameter controls what the virtual client will
identify as. The `WritebackFile` parameter will store the writeback of
the virtual client so you can reuse it next time to keep the same
client id.

4. In the `Resources` tab you can update the `Max Execution time`
   which controls how long the virtual client will be alive. By default
   this is 1 hour.

After launching the artifact, you can inspect the query log to see how
the artifact automatically inspects each partition to detect the
remapping configuration.

![Artifact Logs](artifact_logs.png)

Although it appears the collection is not complete, it is actually
starting a client with this remapping, and waits for the timeout
before the client is torn down. During this time you can interact with
the client, collect any artifacts, participate in any hunts etc.

5. Search for the hostname to find the new client id.

![Search for the new virtual client](deaddiskhost.png)

6. You can now collect any artifacts that primarily read from the disk

![Collecting artifacts from the virtual client](collecting_from_image.png)

7. The query log from every collection will indicate the data comes
   from the image file.

![Artifact collection logs](collecting_from_image_logs.png)


Tags: #forensics #triage
