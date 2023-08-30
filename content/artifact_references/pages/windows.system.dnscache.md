---
title: Windows.System.DNSCache
hidden: true
tags: [Client Artifact]
---

Windows maintains DNS lookups for a short time in the DNS cache.

This artifact collects DNS cache entries using the WMI class MSFT_DNSClientCache.


<pre><code class="language-yaml">
name: Windows.System.DNSCache
description: |
  Windows maintains DNS lookups for a short time in the DNS cache.

  This artifact collects DNS cache entries using the WMI class MSFT_DNSClientCache.

parameters:
  - name: kMapOfRecordType
    description: |
      Mapping of decimal DNS record types to human-readable types
    type: hidden
    default: |
      {
      &quot;0&quot;: &quot;Reserved&quot;,
      &quot;1&quot;: &quot;A&quot;,
      &quot;2&quot;: &quot;NS&quot;,
      &quot;3&quot;: &quot;MD&quot;,
      &quot;4&quot;: &quot;MF&quot;,
      &quot;5&quot;: &quot;CNAME&quot;,
      &quot;6&quot;: &quot;SOA&quot;,
      &quot;7&quot;: &quot;MB&quot;,
      &quot;8&quot;: &quot;MG&quot;,
      &quot;9&quot;: &quot;MR&quot;,
      &quot;10&quot;: &quot;NULL&quot;,
      &quot;11&quot;: &quot;WKS&quot;,
      &quot;12&quot;: &quot;PTR&quot;,
      &quot;13&quot;: &quot;HINFO&quot;,
      &quot;14&quot;: &quot;MINFO&quot;,
      &quot;15&quot;: &quot;MX&quot;,
      &quot;16&quot;: &quot;TXT&quot;,
      &quot;17&quot;: &quot;RP&quot;,
      &quot;18&quot;: &quot;AFSDB&quot;,
      &quot;19&quot;: &quot;X25&quot;,
      &quot;20&quot;: &quot;ISDN&quot;,
      &quot;21&quot;: &quot;RT&quot;,
      &quot;22&quot;: &quot;NSAP&quot;,
      &quot;23&quot;: &quot;NSAP-PTR&quot;,
      &quot;24&quot;: &quot;SIG&quot;,
      &quot;25&quot;: &quot;KEY&quot;,
      &quot;26&quot;: &quot;PX&quot;,
      &quot;27&quot;: &quot;GPOS&quot;,
      &quot;28&quot;: &quot;AAAA&quot;,
      &quot;29&quot;: &quot;LOC&quot;,
      &quot;30&quot;: &quot;NXT&quot;,
      &quot;31&quot;: &quot;EID&quot;,
      &quot;32&quot;: &quot;NIMLOC&quot;,
      &quot;33&quot;: &quot;SRV&quot;,
      &quot;34&quot;: &quot;ATMA&quot;,
      &quot;35&quot;: &quot;NAPTR&quot;,
      &quot;36&quot;: &quot;KX&quot;,
      &quot;37&quot;: &quot;CERT&quot;,
      &quot;38&quot;: &quot;A6&quot;,
      &quot;39&quot;: &quot;DNAME&quot;,
      &quot;40&quot;: &quot;SINK&quot;,
      &quot;41&quot;: &quot;OPT&quot;,
      &quot;42&quot;: &quot;APL&quot;,
      &quot;43&quot;: &quot;DS&quot;,
      &quot;44&quot;: &quot;SSHFP&quot;,
      &quot;45&quot;: &quot;IPSECKEY&quot;,
      &quot;46&quot;: &quot;RRSIG&quot;,
      &quot;47&quot;: &quot;NSEC&quot;,
      &quot;48&quot;: &quot;DNSKEY&quot;,
      &quot;49&quot;: &quot;DHCID&quot;,
      &quot;50&quot;: &quot;NSEC3&quot;,
      &quot;51&quot;: &quot;NSEC3PARAM&quot;,
      &quot;52&quot;: &quot;TLSA&quot;,
      &quot;53&quot;: &quot;SMIMEA&quot;,
      &quot;54&quot;: &quot;Unassigned&quot;,
      &quot;55&quot;: &quot;HIP&quot;,
      &quot;56&quot;: &quot;NINFO&quot;,
      &quot;57&quot;: &quot;RKEY&quot;,
      &quot;58&quot;: &quot;TALINK&quot;,
      &quot;59&quot;: &quot;CDS&quot;,
      &quot;60&quot;: &quot;CDNSKEY&quot;,
      &quot;61&quot;: &quot;OPENPGPKEY&quot;,
      &quot;62&quot;: &quot;CSYNC&quot;,
      &quot;63&quot;: &quot;ZONEMD&quot;,
      &quot;64&quot;: &quot;SVCB&quot;,
      &quot;65&quot;: &quot;HTTPS&quot;,
      &quot;99&quot;: &quot;SPF&quot;,
      &quot;100&quot;: &quot;UINFO&quot;,
      &quot;101&quot;: &quot;UID&quot;,
      &quot;102&quot;: &quot;GID&quot;,
      &quot;103&quot;: &quot;UNSPEC&quot;,
      &quot;104&quot;: &quot;NID&quot;,
      &quot;105&quot;: &quot;L32&quot;,
      &quot;106&quot;: &quot;L64&quot;,
      &quot;107&quot;: &quot;LP&quot;,
      &quot;108&quot;: &quot;EUI48&quot;,
      &quot;109&quot;: &quot;EUI64&quot;,
      &quot;249&quot;: &quot;TKEY&quot;,
      &quot;250&quot;: &quot;TSIG&quot;,
      &quot;251&quot;: &quot;IXFR&quot;,
      &quot;252&quot;: &quot;AXFR&quot;,
      &quot;253&quot;: &quot;MAILB&quot;,
      &quot;254&quot;: &quot;MAILA&quot;,
      &quot;255&quot;: &quot;*&quot;,
      &quot;256&quot;: &quot;URI&quot;,
      &quot;257&quot;: &quot;CAA&quot;,
      &quot;258&quot;: &quot;AVC&quot;,
      &quot;259&quot;: &quot;DOA&quot;,
      &quot;260&quot;: &quot;AMTRELAY&quot;,
      &quot;32768&quot;: &quot;TA&quot;,
      &quot;32769&quot;: &quot;DLV&quot;,
      &quot;65535&quot;: &quot;Reserved&quot;
      }

  - name: kMapOfStatus
    description: |
      Mapping of decimal status to human-readable status
    type: hidden
    default: |
      {
      &quot;0&quot;: &quot;Success&quot;,
      &quot;9003&quot;: &quot;NotExist&quot;,
      &quot;9701&quot;: &quot;NoRecords&quot;
      }

  - name: kMapOfSection
    description: |
      Mapping of decimal section to human-readable section
    type: hidden
    default: |
      {
      &quot;1&quot;: &quot;Answer&quot;,
      &quot;2&quot;: &quot;Authority&quot;,
      &quot;3&quot;: &quot;Additional&quot;
      }

sources:
  - precondition: |
      SELECT OS from info() where OS = &quot;windows&quot;
    query: |
      LET wmiQuery &lt;= &#x27;&#x27;&#x27;
         SELECT Data, Entry, Status, TimeToLive, Type, Section
         FROM MSFT_DNSClientCache
      &#x27;&#x27;&#x27;
      LET wmiNamespace &lt;= &quot;root/StandardCimv2&quot;
      LET MapOfRecordType &lt;= parse_json(data=kMapOfRecordType)
      LET MapOfStatus &lt;= parse_json(data=kMapOfStatus)
      LET MapOfSection &lt;= parse_json(data=kMapOfSection)

      LET dns_cache_entries = SELECT
          Entry AS Name,
          Data AS Record,
          get(item=MapOfRecordType,
              member=str(str=Type), default=Type) AS RecordType,
          Type AS _RecordType,
          atoi(string=TimeToLive) AS TTL,
          get(item=MapOfStatus,
              member=str(str=Status), default=Status) AS QueryStatus,
          Status AS _QueryStatus,
          get(item=MapOfSection,
              member=str(str=Section), default=Section) AS SectionType,
          Section AS _SectionType
      FROM wmi(query=wmiQuery, namespace=wmiNamespace)

      SELECT * FROM dns_cache_entries

</code></pre>

