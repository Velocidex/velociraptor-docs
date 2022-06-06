# How can I url/percent decode a string?

During investigation you may find logs or other data with percent-encoded strings. 
Since 0.6.5 we have included a lambda function in regex_replace() that enables decode and managing errors to enable analysis.

```vql
LET Line = '''http://target/login.asp?userid=bob%27%3b%20update%20logintable%20set%20passwd%3d%270wn3d%27%3b--%00'''

SELECT regex_replace(source=Line, replace_lambda="x=>unhex(string=x[1:]) || x", re="%..") as DecodedLine FROM scope() 

```

![UrlDecode: results](https://user-images.githubusercontent.com/13081800/172098424-d78c73f9-e7d2-405b-99ca-129eba4350c0.png)


Tags: #decode #url #vql
