# Plugins

> ⚠️ NOTE: This document is for Plugin developers. If you are looking for how to contribute to Cerebro core please check [Cerebro documentation](./cerebro-developers.md).

A Cerebro plugin is just a javascript module. All you need is to write a function, that takes one object and call a function from arguments with your results.

You can create your plugin using [create-cerebro-plugin](https://github.com/cerebroapp/create-cerebro-plugin) so you can focus on code of your plugin, not on tools and configuration around it.

Links:

* [Plugin structure](./plugins/plugin-structure.md);
* [Cerebro tools](https://github.com/cerebroapp/cerebro-tools);
* [Cerebro UI](https://github.com/cerebroapp/cerebro-ui);
* [Styles](./plugins/styles.md) for you plugin previews;
* [Share your plugin](./plugins/share.md);
* [Examples](./plugins/examples.md);

## Prerequisites

* [Node.js](https://nodejs.org/en/) (>= 16)
* [yarn](https://classic.yarnpkg.com/en/)

## Install and manage custom plugins

Sometimes you need to manually install a plugin (maybe you have published it to npm but you dind't added the keywords to the package.json so it is not available in Cerebro).
If you want to test this plugin, you can install it manually:

1. Open a terminal in the [configuration directory](/docs/cerebro-developers.md#config-file-path) of Cerebro
2. Go to the plugins directory

    ```bash
    cd ./plugins
    ```

3. Install the plugin

    ```bash
    npm install --save name-of-plugin
    ```

4. Restart Cerebro
