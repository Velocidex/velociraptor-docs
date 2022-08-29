# How can I url/percent decode a string?

During investigation you may find logs or other data with percent-encoded strings. 
Since 0.6.5 we have included a lambda function in regex_replace() that enables decode and managing errors to enable analysis.

```vql
LET Line = '''http://target/login.asp?userid=bob%27%3b%20update%20logintable%20set%20passwd%3d%270wn3d%27%3b--%00'''

SELECT regex_replace(source=Line, replace_lambda="x=>unhex(string=x[1:]) || x", re="%..") as Decoded FROM scope() 

```

![Url Decode: results](https://user-images.githubusercontent.com/13081800/172098424-d78c73f9-e7d2-405b-99ca-129eba4350c0.png)


Similarly, to URL encode we can run a similar function:

```
LET Line = '''http://target/login.asp?userid=bob'; update logintable set passwd='0wn3d';--'''

SELECT
    regex_replace(source=Line,replace_lambda="x=>format(format='%%%x',args=x)", re=" |\\!|\\#|\\$|\\&|\\'|\\(|\\)|\\*|\\+|\\,|\\;|\\=|\\@|\\[|\\]") as Encoded
FROM scope()
```

![Url Encode: results](https://user-images.githubusercontent.com/13081800/187111592-7b33f103-5e00-42ce-a4c1-a9a1acf2f1d7.png)



Tags: #decode #encode #url #vql
