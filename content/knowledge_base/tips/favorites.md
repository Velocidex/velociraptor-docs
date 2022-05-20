# How can I save my favorite collections for the future?

Sometimes we tend to collect the same set of artifacts together,
possibly with some specific parameters. It gets tedious to constantly
reconfigure the `New Collection` interface with the same set of
artifacts.

This where the `favorites` feature comes in. We can save existing
collections including the artifacts collected and their
parameters. Then in future we just need to restore our collections
from our favorites.

![Saving a collection as a favorite](fav.png)


The favorite can be restored in future by simply adding a new
collection, clicking the favorite button and searching for it.

![Restoring a favorite collection](fav2.png)

## Creating favorites programmatically

Favorites are stored into the user's profile, since each user might
have a different set of artifacts they normally use.

It is possible however to create favorites using VQL with the [favorites_save()]({{% ref "/vql_reference/server/favorites_save/" %}}) function:

```vql
SELECT favorites_save(type="CLIENT", name="MyFavorite",
specs='''
[{"artifact":"Windows.Search.FileFinder",
  "parameters": {
    "env": [{
        "key": "SearchFilesGlob",
        "value": "HKEY_USERS/*/Software/Sysinternals/*/*"
    }, {
        "key": "Accessor",
        "value": "registry"
    }]}}]''')
FROM scope()
```

Note the `spec` parameter is a JSON encoded blob of the various
artifact parameters.

By including the VQL in a notebook, any user can collect it and
install the favorites in their own profile.

Tags: #labels #huntmanagement
