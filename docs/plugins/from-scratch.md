# <a href="../plugins.md">Plugins</a> → Create from scratch
1. Create new directory and run `npm init` in your folder. Enter name, version, description and entry point for your plugin.
1. Create entry point script, i.e. `index.js`
1. Your plugin should be moved to `~/Library/Application Support/Cerebro/plugins/node_modules`. Easiest way to it is to create symlink. I.e. you can use this command from your plugin directory: `ln -s "${PWD}" "${HOME}/Library/Application Support/Cerebro/plugins/node_modules/${PWD##*/}"`
1. Open Cerebro settings and turn on developer mode;
1. You are ready to go! Use <kbd>cmd+alt+i</kbd> to open developer tools in Cerebro and <kbd>cmd+r</kbd> from developer tools to reload Cerebro so you can see you plugin changes.

Now you can check [how to write plugin](./plugin-structure.md).
