# Custom quarantine exclusions

We may want to add custom exclusions to Velociraptor quarantine and allow communication to another IP

1. Add machine in scope to a new label: e.g NewQuarantine
2. Remove standard quarantine
3. Run a hunt targeting your label above or a collection on the single machine
4. Select relevant quarantine content:  Windows.Remediation.Quarantine
5. Add additional IP exclusions
   Action = Permit
   SrcAddr = me
   DstAddr = IP to exclude
   Mirrored = yes for bidirectional communication
   Description

![image](https://user-images.githubusercontent.com/13081800/222630435-4882554a-eefa-4a78-9ae2-fe41d3d60874.png)


Tags: #quarantine, #containment
