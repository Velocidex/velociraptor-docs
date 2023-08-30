---
title: Windows.Persistence.PermanentWMIEvents
hidden: true
tags: [Client Artifact]
---

This artifact reports currently deployed permanent WMI Event Consumers. The 
artifact collects Binding information, then presents associated Filters 
and Consumers.

NOTE: the artifact does not report on individual eventing classes. A seperate 
wmi query will need to be made for unlinked components that may reside in the 
WMI datastore.  

WMI Eventing components:  

- __FilterToConsumerBinding - ties together Filter + Consumer
- __EventFilter - trigger condition
- __EventConsumer - payload


<pre><code class="language-yaml">
name: Windows.Persistence.PermanentWMIEvents
author: Matt Green - @mgreen27
description: |
    This artifact reports currently deployed permanent WMI Event Consumers. The 
    artifact collects Binding information, then presents associated Filters 
    and Consumers.
    
    NOTE: the artifact does not report on individual eventing classes. A seperate 
    wmi query will need to be made for unlinked components that may reside in the 
    WMI datastore.  

    WMI Eventing components:  
    
    - __FilterToConsumerBinding - ties together Filter + Consumer
    - __EventFilter - trigger condition
    - __EventConsumer - payload

reference:
  - https://attack.mitre.org/techniques/T1546/003/

parameters:
  - name: AllRootNamespaces
    description: Select to scan all ROOT namespaces. This setting over rides specific namespaces configured below.
    type: bool
  - name: Namespaces
    description: Add a list of target namespaces.
    type: csv
    default: |
       namespace
       root/subscription
       root/default

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      LET namespaces &lt;= SELECT * FROM if(condition=AllRootNamespaces, 
            then= { 
                SELECT &#x27;root/&#x27; + Name as namespace 
                FROM wmi(namespace=&#x27;ROOT&#x27;,query=&#x27;SELECT * FROM __namespace&#x27; )
                WHERE namespace
            },
            else= Namespaces )
    
      LET FilterToConsumerBinding &lt;= SELECT * FROM foreach(
            row=namespaces,
            query={
                SELECT parse_string_with_regex(string=Consumer,
                    regex=[&#x27;((?P&lt;namespace&gt;^[^:]+):)?(?P&lt;Type&gt;.+?)\\.Name=&quot;(?P&lt;Name&gt;.+)&quot;&#x27;]) as Consumer,
                    parse_string_with_regex(string=Filter,regex=[&#x27;((?P&lt;namespace&gt;^[^:]+):)?(?P&lt;Type&gt;.+?)\\.Name=&quot;(?P&lt;Name&gt;.+)&quot;&#x27;]) as Filter
                FROM wmi(
                    query=&quot;SELECT * FROM __FilterToConsumerBinding&quot;,namespace=namespace)
        },workers=len(list=namespaces))
        
      SELECT * FROM foreach(
            row=namespaces,
            query={
                 SELECT {
                     SELECT * FROM wmi(
                       query=&quot;SELECT * FROM &quot; + Consumer.Type,
                       namespace=if(condition=Consumer.namespace,
                          then=Consumer.namespace,
                          else=namespace)) WHERE Name = Consumer.Name
                   } AS ConsumerDetails,
                   {
                     SELECT * FROM wmi(
                       query=&quot;SELECT * FROM &quot; + Filter.Type,
                       namespace=if(condition=Filter.namespace,
                          then=Filter.namespace,
                          else=namespace)) WHERE Name = Filter.Name
                   } AS FilterDetails,
                   namespace as Namespace
                 FROM FilterToConsumerBinding
                 WHERE (FilterDetails OR ConsumerDetails)
            },workers=len(list=namespaces))
</code></pre>

