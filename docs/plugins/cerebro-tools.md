# <a href="../plugins.md">Plugins</a> → `cerebro-tools`
`cerebro-tools` is a package to DRY your plugins code. Currently it includes only three functions: `memoize`, `search` and `shellCommand`. 

> Later more functions and react components will be added.

## Search
Use this function to filter your collection by provided search term.
```js
// Require from npm module
const { search } = require('cerebro-tools');

// Convert item from collection to string. Default is `(el) => el`
const toString = (el) => el.title;

// Search for `term` in your collection
const results = search(collection, term, toString);
```

## Memoize
Use this function to reduce calls to external APIs.

```js
const { memoize } = require('cerebro-tools');

const fetchResults = require('path/to/fetchResults');

const cachedFetchResults = memoize(fetchResults)
```

Check out [memoizee](https://github.com/medikoo/memoizee) docs for more info.

How to [share your plugin](./share.md).

## shellCommand

It is just promise-wrapper for `require('child_process').exec`:

```
const { shellCommand } = require('cerebro-tools');

const result = shellCommand('ls ./').then(output => console.log(output));
```
