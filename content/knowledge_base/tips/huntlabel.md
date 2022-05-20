# Applying labels to hunt results

Sometimes it is useful to label clients from a hunt.

For the following example, I will label all machines with rows from the Windows.Carving.CobaltStrike artifact with a label "CobaltStrike".

```vql
SELECT ClientId,Fqdn,Rule,
    label(client_id=ClientId,labels=['CobaltStrike'],op='set') as SetLabel
FROM source(artifact="Windows.Carving.CobaltStrike")
GROUP BY ClientId
```

![image](https://user-images.githubusercontent.com/13081800/169450498-39d31902-81ec-4b7c-8c6c-72abe0419c7e.png)

Tags: #labels
