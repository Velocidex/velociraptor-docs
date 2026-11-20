# reduce



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
items|A list of items to apply the lambda on|Any (required)
lambda|A VQL Lambda to apply on each item|Lambda
### Description

Apply a lambda function on each item and return the accumulator. The lambda is expected to receive the accumulator and the item. For example `(acc, x)=>acc + x`


