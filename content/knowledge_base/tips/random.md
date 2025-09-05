# How do you generate random characters?

Using the rand() function we can manipulate the results to output a character set then use the WHERE condition to filter for the characters of interest.

For example output 32 random printable characters:
```
  LET RandomChars = SELECT format(format="%c", args=rand(range=255)) AS Character
  FROM range(end=9999999999)
  WHERE Character =~ "[ -~]"
  LIMIT 32

SELECT join(array=RandomChars.Character) as Characters FROM scope()
```
Modify the Character WHERE regex and LIMIT for desired results.

![](259396221-15d5e7f3-f519-4446-bbcb-fb42d97f4197.png)


Tags: #random, #vql
