# [Plugins](../plugins.md) → Plugin structure

This is a minimum source code of your plugin:

```js
export const fn = (scope) => console.log(scope.term)
```

> You can open the developer tools by pressing `ctrl+shift+i`(for the main window) and `ctrl+shift+b`(for the background). Developer mode should be enabled from the settings

This plugin will write to console all changes in your search field of Cerebro app. So, `fn` key is a heart of your plugin: this function receives `scope` object and you can send results back to Cerebro. Scope object is:

* `term` – `String`, entered by Cerebro user;
* `display` – `Function(result: Object | Array<object>)`, display your result
* `update` – `Function(id: String, result: Object)`, update your previously displayed result. This action updates only passed fields, so if you displayed result `{id: 1, title: 'Result'}` and call `update(1, {subtitle: 'Subtitle'})`, you will have merged result: `{id: 1, title: 'Result', subtitle: 'Subtitle'}`;
* `hide` – `Function(id: String)`, hide result from results list by id. You can use it to remove temporar results, like "loading..." placeholder;
* `actions` – object with main actions, provided for cerebro plugins:
  * `open` – `Function(path: String)`, open external URL in browser or open local file;
  * `reveal` – `Function(path: String)`, reveal file in finder;
  * `copyToClipboard` – `Function(text: String)`, copy text to clipboard;
  * `replaceTerm` – `Function(text: String)`, replace text in main Cerebro input;
  * `hideWindow` – `Function()`, hide main Cerebro window.
* `settings` - `Object`, contains user provided values of all specified settings keys;

Let's show something in results list:

```js
export const fn = (scope) => {
  scope.display({
    title: 'It works!',
    subtitle: `You entered ${scope.term}`
  })
}
```

`scope.display` accepts one result object or array of result objects. Result object is:

## Basic fields

### `title`

Type: `String`

Title of your result;

### `subtitle`

Type: `String`

Subtitle of your result;

### `icon`

Type: `String`

Icon, that is shown near your result. It can be absolute URL to external image, absolute path to local image or base64-encoded [data-uri](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

For local icons you can use path to some `.app` file, i.e. `/Applications/Calculator.app` will render default icon for Calculator application.

## Advanced fields

### `id`

Type: `String`
Use this field when you need to update your result dynamically. Check `id` [example](./examples.md#using-id)

### `term`

Type: `String`

Autocomplete for your result. So, user can update search term using <kbd>tab</kbd> button;

### `clipboard`

Type: `String`

Text, that will be copied to clipboard using <kbd>cmd+c</kbd>, when your result is focused;

### `getPreview`

Type: `Function`

Arguments: no

Function that returns preview for your result. Preview can be an html string or React component;

### `onSelect`

Type: `Function`.
Arguments: `event: Event`

Action, that should be executed when user selects your result. I.e, to open provided url in default browser:

```js
onSelect: (event) => actions.open(`http://www.cerebroapp.com`),
```

If you don't want to close main window after your action, you should call `event.preventDefault()` in your action.

### `onKeyDown`

Type: `Function`

Arguments: `event: Event`

Handle keyboard events when your result is focused, so you can do custom actions, i.e. reveal file in finder by <kbd>cmd+r</kbd> (or <kbd>ctrl+r</kbd> on windows and linux):

```js
onKeyDown: (event) => {
  if ((event.metaKey || event.ctrlKey) && event.keyCode === 82) {
    actions.reveal(path);
    event.preventDefault();
  }
}
```

You can also prevent default action by `event.preventDefault()`.

## Advanced plugin fields

Along with `fn`, your module could have more keys:

### `keyword`

Type: `String`

This field is used for autocomplete. You can prefix your plugin usage by this keyword. Checkout emoji [example](./examples.md#using-keyword-and-name)

### `name`

Type: `String`

This field is also used for autocomplete and shown as title in results list. Checkout emoji [example](./examples.md#using-keyword-and-name)

### `initialize`

Type: `Function`
Arguments: no

Use this function, when you need to prepare some data for your plugin on start. If you need to do some long-running processes, check `initializeAsync`

Check `initialize` [example](./examples.md#using-initialize)

### `initializeAsync`

Type: `Function`

Arguments: `callback: Function(message: Object)` – callback to send data back to main process.

Use this function when you need to execute some long-running initializer process. I.e. in contacts plugin we are fetching all contacts using osx-specific libraries using `nodobjc` module.

This function will be executed in another process and you can receive results using `onMessage` function.

Check `initializeAsync` and `onMessage` [example](./examples.md#using-initializeasync-and-onmessage)

### `onMessage`

Type: `Function`
Arguments: `message: Object` – object that you sent from `initializeAsync`

Use this function to receive data back from your `initializeAsync` function.

Check `initializeAsync` and `onMessage` [example](./examples.md#using-initializeasync-and-onmessage)

### `settings`

Type: `Object`

This object is used to specify settings that a plugin user can change. Each setting should include a `description` and a `type`. Other keys include:

* `label` - `String`, object key for the setting. also used to access it;
* `description` -  `String`, description of the setting;
* `type` - `String`, used to decide element for rendering a setting:
  * `string`
  * `number`
  * `bool`
  * `option`
* `defaultValue` - `Any`, default value for the setting;
* `options` - `Array`, all possible options that can be selected by the user. applicable only for `option`;
* `multi` - `Bool`, allows user to select more than one option for `option` settings. applicable only for `option`;
* `createable` - `Bool`, allows user created options. applicable only for `option`;

Check `settings` [example](./examples.md#using-settings)

Take a look at [React Select](https://github.com/JedWatson/react-select) for more details on how the `option` type works.

## Available `env` variables

The following variables are available in the `process.env` object:

* `CEREBRO_VERSION` – Version of Cerebro
* `CEREBRO_DATA_PATH` – Path to Cerebro data directory
