# <a href="../plugins.md">Plugins</a> → Plugin structure

This is a minimum source code of your plugin:

```js
module.exports = {
  fn: (scope) => console.log(scope.term)
}
```

This plugin will write to console all changes in your search field of Cerebro app. So, `fn` key is a heart of your plugin: this function receives `scope` object and your can send results back to Cerebro. Scope object is:

* `term` – `String`, entered by Cerebro user;
* `display` – `Function(Object | Array<object>)`, display your result (or array of results) in Cerebro results list;
* `actions` – object with main actions, provided for cerebro plugins:
  * `open` – `Function(path: String)`, open external URL in browser or open local file;
  * `reveal` – `Function(path: String)`, reveal file in finder;
  * `copyToClipboard` – `Function(text: String)`, copy text to clipboard;
  * `replaceTerm` – `Function(text: String)`, replace text in main Cerebro input.


Let's show something in results list:

```js
const plugin = (scope) => {
  scope.display({
    title: 'It works!',
    subtitle: `You entered ${scope.term}`
  })
}

module.exports = {
  fn: plugin
}
```

`scope.display` accepts one or several results. Result object is:

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

```
onSelect: (event) => actions.open(`http://www.cerebroapp.com`),
```

If you don't want to close main window after your action, you should call `event.preventDefault()` in your action.

### `onKeyDown`
Type: `Function`

Arguments: `event: Event`

Handle keyboard events when your result is focused, so you can do custom actions, i.e. reveal file in finder by <kbd>cmd+r</kbd>:

```js
onKeyDown: (event) => {
  if (event.metaKey && event.keyCode === 82) {
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
