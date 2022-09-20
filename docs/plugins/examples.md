# [Plugins](../plugins.md) → Examples

You always can check out source code of existing plugins, like:

* [cerebro-math](https://github.com/cerebroapp/cerebro-math)
* [cerebro-google](https://github.com/cerebroapp/cerebro-google)
* [cerebro-emoj](https://github.com/cerebroapp/cerebro-emoj)
* [cerebro-gif](https://github.com/cerebroapp/cerebro-gif)
* [cerebro-kill](https://github.com/cerebroapp/cerebro-kill)
* [cerebro-ip](https://github.com/cerebroapp/cerebro-ip)

## Using `id`

```js
export const fn = ({display}) => {
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
```

## Using `icon`

```js
import icon from '[path-to-icon]/icon.png';

const plugin = ({display}) => {
  display({
    icon,
    title: 'Title',
    subtitle: 'Subtitle'
  });
}

export default {
  fn: plugin,
}
```

## Using `keyword` and `name`

```js
const plugin = (scope) => {
  const match = scope.term.match(/^emoj\s(.+)/);
  if (match) {
    searchEmojis(match[1]).then(results => {
      scope.display(results)
    })
  };
}

export default {
  name: 'Search emojis...',
  fn: plugin,
  keyword: 'emoj'
}

```

## Using `initialize`

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

export default {
  initialize: initialize,
  fn: plugin
}
```

## Using `initializeAsync` and `onMessage`

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

export default {
  initializeAsync: initialize,
  onMessage: onMessage,
  fn: plugin
}
```

## Using `cerebro-tools`

```js
import { memoize, search } from 'cerebro-tools';
import preprocessJson from './preprocessJson';

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

export default {
  fn: plugin
};
```

## using `settings`

```js
const plugin = ({ display, settings }) => {
  const icon = require('[path-to-icon]/icon.png');

  display({
    icon: settings.icon ? icon : '',
    title: `${settings.username}, you have been around for ${settings.age}`,
    subtitle: `Favorite languages: ${settings.languages.join(',')}`,
  })
}

export default {
  fn: plugin,
  settings: {
    username: { type: 'string' },
    age: { type: 'number', defaultValue: 42 },
    icon: { type: 'bool' },
    languages: {
      type: 'option',
      description: 'Your favorite programming languages'
      options: [
        { label: 'JavaScript', value: 'js' },
        { label: 'Haskell', value: 'hsk' },
        { label: 'Rust', value: 'rs' }
      ],
      multi: true,
      createable: true,
    }
  }
}

```
