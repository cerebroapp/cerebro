# <a href="../plugins.md">Plugins</a> → Examples
You always can check out source code of existing plugins, like:

* [cerebro-emoj](https://github.com/KELiON/cerebro-emoj)
* [cerebro-gif](https://github.com/KELiON/cerebro-gif)
* [cerebro-kill](https://github.com/KELiON/cerebro-kill)
* [cerebro-ip](https://github.com/KELiON/cerebro-ip)


Or any of [core](../../main/plugins/core) plugins.

### Using `id`
```js
const plugin = ({display}) => {
  display({
    id: 'my-id',
    title: 'Loading'
  })
  fetchResult().then((result) => {
    display({
      id: 'my-id',
      title: `Fetched result: ${result}`
    })
  });
}

module.exports = {
  fn: plugin,
}
```

### Using `keyword` and `name`
```js
const plugin = (scope) => {
  const match = scope.term.match(/^emoj\s(.+)/);
  if (match) {
    searchEmojis(match[1]).then(results => {
      scope.display(results)
    })
  };
}

module.exports = {
  name: 'Search emojis...'
  fn: plugin,
  keyword: 'emoj'
}

```

### Using `initialize`
```js
// Some data needed for your plugin
let data;

// Fetch some data only on app initialization
const initialize = () => {
  fetchYourData().then(result => {
    data = result
  });
}

const plugin = (scope) => {
  const results = search(data, scope.term);
  scope.display(results);
}

module.exports = {
  initialize: initialize,
  fn: plugin
}
```


### Using `initializeAsync` and `onMessage`
```js
let data;

// Run some long-running initialization process in background
const initialize = (cb) => {
  fetchYourData().then(cb);
  // and re-fetch this information once in 1h
  setInterval(() => {
    initialize(cb);
  }, 60 * 3600);
}

const onMessage = (results) => {
  data = results;
}

const plugin = (scope) => {
  const results = search(data, scope.term);
  scope.display(results);
}

module.exports = {
  initializeAsync: initialize,
  onMessage: onMessage,
  fn: plugin
}
```

### Using `cerebro-tools`
```js
const { memoize, search } = require('cerebro-tools');
const preprocessJson = require('./preprocessJson');

// Memoize your fetched data from external API
const fetchData = memoize(() => {
  return fetch('http://api/url')
    .then(response => response.json())
    .then(preprocessJson)
});

const plugin = ({term, display}) => {
  fetchData().then(data => {
    const results = search(data, term, (el) => el.name);
    display(term);
  })
}

module.exports = {
  fn: plugin
};
```
