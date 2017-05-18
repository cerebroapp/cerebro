# <a href="../plugins.md">Plugins</a> → Create using boilerplate
1. [Download latest version](https://github.com/KELiON/cerebro-plugin/archive/master.zip) of [cerebro-plugin](https://github.com/KELiON/cerebro-plugin) boilerplate and unarchive it to some folder;
1. Run `npm install` inside this folder;
1. Open Cerebro settings and turn on developer mode;
1. run `npm run debug` – it will create symlink to your current folder in cerebro plugins directory and start webpack in watch mode, so you don't need to rebuild you source code everytime. On windows use [cygwin](https://www.cygwin.com/) or [git bash](https://git-scm.com/download/win) instead of cmd.exe and `./scripts/debug` command instead of `npm run debug`. If you choose to use cmd.exe, use `npm run debug:windows`. See [cerebro-plugin](https://github.com/KELiON/cerebro-plugin).
1. You are ready to go! Use <kbd>cmd+alt+i</kbd> to open developer tools in Cerebro and <kbd>cmd+r</kbd> from developer tools to reload Cerebro so you can see you plugin changes.

Now you can check [how to write plugin](./plugin-structure.md).
