---
menutitle: "Trainings"
title: "Upcoming Training Events"
description: |
    The Velociraptor team will be at BlackHat this year!

weight: 20
no_edit: true
noTitle: true

---

# Digging Deeper With Velociraptor
## Mike Cohen, Digital Paleontologist, Rapid7 Inc. | August 5-8

We are really looking forward to spend the week with other
Velociraptor fans geeking out on DFIR and Velociraptor!

This year we will be presenting an extensive, 4 day long, Velociraptor
training course at
[BlackHat 2023](https://www.blackhat.com/us-23/training/schedule/#digging-deeper-with-velociraptor-30129)!


## Detailed Outline

The following detailed course outline gives you an idea of the topics
covered in the training. Of course this is a live course and we love
discussing all things Velociraptor, so please bring your own questions
and ideas along as well!

### **Module 1**: Deployment

   * Deploying Servers
      * What is Velociraptor?
      * Typical deployments and overview
      * Cloud deployment options
      * Setting up Dynamic DNS
      * Configuring Google OAuth2
      * Exercise: Configure and deploy a new Server with Google and
        Lets Encrypt
      * Using multiple OAuth providers - Azure + Google
      * Deploying with browser client certificates
      * Exercise: Create a Multi-Frontend deployments
      * Exercise: Customize the dashboard
      * Server Lockdown Mode: Additional security.
   * Multi-Tenancy deployments
      * Supporting multiple Orgs on the same server.
      * Exercise: Create a new Org
      * User roles, ACLs and Orgs
      * Exercise: Add additional Users to new Org
      * Exercise: Prepare MSI deployment for different orgs
      * Auditing User Actions.
   * Deploying Clients
      * Windows - Creating MSI packages
      * Exercise: Domain Deployment
   * GUI Tour
      * The Dashboard
      * User preferences: Themes, Languages, Timezones
      * Interactively investigate clients
      * Searching for clients
      * Running shell commands
      * The Virtual Filesystem
      * Previewing files in the GUI

### **Module 2**: VQL Fundamentals

  * The Velociraptor Query Language
      * Why a query language?
      * The Notebook - an interactive document
      * What is VQL syntax?
      * Life of a query - understanding data flow
      * Explaining a VQL Query
      * Exercise: List running processes
      * Exercise: Lazy Evaluation
      * What is a scope?
      * The foreach() plugin
      * Exercise: Hash all the files!
      * Exercise: Hash faster!
      * LET Expressions
      * Materialized LET Expressions
      * Local VQL Functions
      * Protocols and VQL operators
      * Exercise: Detect WMI launched shell
      * Exercise: Enrich netstat with binary info
  * VQL Artifacts: VQL Modules
      * What are Velociraptor Artifacts?
      * The Artifact Exchange
      * Exercise: Selectively Import artifacts
      * Main parts of an artifact
      * Parameter types
      * Exercise: Create an artifact - WMI shell
      * Collecting artifact
      * Artifact Writing tips
      * VQL and times - formatting and parsing times
      * Exercise: Identify recently active accounts
      * VQL Control structures
      * Aggregate Functions and GROUP BY Stacking
  * Event Queries and asynchronous VQL
      * What are Event Queries
      * Client monitoring with VQL

### **Module 3**: Filesystem Forensics

  * Searching for files - glob()
    * Exercise: Search for executables
    * Filesystem accessors
    * The registry accessor
    * Exercise: RunOnce detection
    * Raw Registry Parsing
    * Paths in Velociraptor
    * The data accessor
    * Search bulk data for patterns: yara
    * Exercise: drive by download using YARA
    * Yara best practice
    * Uploading files
    * Exercise: Collect all executables in user's home directory
  * NTFS Forensics
    * NTFS Overview
    * NTFS Analysis in Velociraptor
    * Finding suspicious files
    * Exercise: Use NTFS analysis to detect attacker behavior
    * The USN Journal
    * Alternate Data Streams
    * Volume Shadow Copies (VSS)
    * The ntfs accessor and VSS
    * Exercise: Find all VSS copies of the same event log
    * Carving the USN Journal
  * More on Accessors
    * The OSPath object
    * Exercise: Parsing a string into OSPath
    * Life of a Path: How are paths handled within VQL
    * Exercise: OSPath operations
    * The ZIP accessor and nested paths
    * Exercise: Search a word document for a keyword
    * The Process Accessor: Accessing process memory
    * Exercise: Write an artifact that uploads process memory
    * The sparse accessor
    * Exercise: Upload only first 10k of each file.
    * The smb accessor
    * Exercise: Configuring an SMB share
  * Parsing: Processing and analysing evidence on the endpoint
    * Built in parsers: SQLite
    * Parsing with Regular Expressions
    * Exercise: Parse MPLogs
    * The binary parser - parsing binary data
    * Exercise: Parsing SSH private keys
    * Exercise: Parsing root certificates in the registry
  * Timelines
    * What is a timeline?
    * Exercise: Create a timeline for the NTFS investigation
  * MSBuild based attacks
    * The Microsoft Build Engine
    * MSBuild: Cobalt Strike teamserver
    * Detection ideas: Disk template files
    * Exercise: Detect a typical MSBuild attack
    * Exercise: Prefetch detection
    * Exercise: Memory only detection
    * Exercise: Search for beacon in memory
    * Exercise: Extract configuration data from memory

### **Module 4**: Event Logs
  * The Windows Event Logs
    * Parsing EVTX log files
    * Event Messages - where are they?
    * Deriving event messages
    * What could go wrong - copying event logs from the system.
    * Disabling event logs
    * Exercise: Detecting disabled event logs
    * Using Sigma Rules to search event logs
    * The EVTX Hunter
  * Syslog log: Linux/Unix logs
    * Line based logging
    * Applying Grok for parsing syslogs
    * Parsing SSH login events
    * Exercise: Write a structured artifact for extracting SSH login events
    * Carving SSH auth logs

### **Module 5**: Offline Collection and Triage
   * Interactive triage collections
     * Collecting Files: Windows.KapeFiles.Targets
     * Resource control
   * Offline Collections
     * Why an offline collector?
     * Creating an Offline Collector
     * Exercise: Collect triage data and upload to a cloud bucket
     * Protecting the collection file: Encryption
     * Exercise: Take a memory image with winpmem
     * Preparing an SMB share to receive offline collections
     * Importing collections into the GUI
     * Local collection considerations

### **Module 6**: Volatile artifacts and Memory Analysis
   * The Process Tracker
     * Tracking process executions on the endpoint
     * Exercise: Emulate an attack
     * The Process Tree and call chain
   * Event Tracing For Windows (ETW)
     * ETW Providers
     * Exercise: Monitor DNS Queries
   * Memory and Process Analysis
     * Mutants
     * Handles
     * Process Information
     * The process Environment Block
     * Process Memory - Mapped Memory
     * The VAD Plugin
     * Exercise: Determine functionality by examining the VAD
     * Process Injection
     * Process Memory Scanning
     * Exercise: Memory carving: Zip Files
     * Physical Memory Acquisition

### **Module 7**: Hunting
   * Hunting at scale
     * Typical hunting workflow
     * Mitre Att&ck framework
     * Atomic Red team
     * Exercise: Image File Execution Options
     * Hunting: Mass collections
     * Exercise: Baseline Event Logs
     * The pool client
     * Exercise: Stacking reveal results that stand out
     * Optimizing filtering and post processing.

### **Module 8**: Event queries for monitoring
  * Using Event Queries for detection.
     * Lateral movement using WMI
     * Exercise: Watch for new service creation
  * Integration with external systems
     * Interfacing with Elastic/Kibana
     * Uploading collections to Elastic
     * Integration with Slack/Discord
     * Exercise: Forwarding alerts to Discord

### **Module 9**: Server Automation and the API
  * Extending VQL With Powershell
     * Exercise: PowerShell based pslist
  * Using External Tools
     * Velociraptor Third Party Tools
     * Exercise: Detect malicious scheduled task with autoruns
     * Exercise - Package Sysinternal DU
     * Serving tools from an SMB server
  * Server Artifacts
     * Exercise: Write artifact for Client version distribution
     * Exercise: label clients
     * Exercise: Write a server event query to automatically import
            new offline collections uploaded to S3 or SMB share.
  * The Velociraptor API
     * Creating an API certificate
     * Managing ACLs for an API key
     * Exposing the API
     * Using the API from Python
     * Exercise: Launch collection on client with the API
     * Exercise: Automatically Decode Powershell encoded cmdline
     * Alerting and escalation.

### **Module 10**: Friendly game of Capture the Flag
  * Given a threat report, your team will develop a set of artifacts
    that detect as many steps in the kill chain as possible. Deploy
    those artifacts in the Velociraptor environment.
  * The Winners are the team that automatically detects and remediates
    the most attacker actions.

## Book now

Reserve your spot on this course by clicking here
https://www.blackhat.com/us-23/training/schedule/#digging-deeper-with-velociraptor-30129
