# Cerebro

> Cerebro is a open-source launcher to improve your productivity and efficiency

<img src="./build/icons/128x128.png" align="right"/>

## Usage

You can download the latest version on  [releases](https://github.com/cerebroapp/cerebro/releases) page.

After installation use default shortcut `ctrl+space` to show an app window. You can customize this shortcut clicking on icon in menu bar → preferences.

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)

### Plugins

### Core plugins

* Search in the web with google suggestions;
* Search & launch application, i.e. `spotify`;
* Navigate in file system with file previews (i.e. `~/Dropbox/passport.pdf`);
* Calculator;
* Smart converter. `15$`, `150 рублей в евро`, `100 eur in gbp`;

## Shortcuts

Cerebro provides several shortcuts to improve your productivity:

* `ctrl+c`: copy the result from a plugin to the clipboard, if the plugin does not provida a result, the term you introduced will be copied
* `ctrl+1...9`: select directly a result from the list
* `ctrl+[hjkl]`: navigate through the results using vim-like keys (Also `ctrl+o` to select the result)

### Change Theme

Use shortcut `ctrl+space` to open app window and type `Cerebro Settings`. There you will be able to change the Theme (Currently Light and Dark Themes are supported out of the box)

![change-cerebro-theme](https://user-images.githubusercontent.com/24854406/56137765-5880ca00-5fb7-11e9-86d0-e740de1127c2.gif)

## For developers

### Install

First, clone the repo via git:

```bash
git clone https://github.com/cerebroapp/cerebro.git cerebro
```

Open the project

```bash
cd cerebro
```

And then install dependencies:

```bash
yarn
```

### Run in development mode

```bash
yarn run dev
```

> Note: requires a node version >=16.x

### Install and manage custom plugins

Use built-in `plugins` command to search and manage custom plugins.

Discover plugins and more at [Cerebro's Awesome List](https://github.com/lubien/awesome-cerebro).

You can install them manually using npm

open it in the terminal configuration file path, go to the plugins folder

```bash
cd ./plugins
```

Install the plugin

 ```bash
 npm install --save name-of-plugin
 ```

## Create plugin

Check out [plugins documentation](./docs/plugins.md).

### Build executable from source

If you would like to install one version but the package is not published you can use this command to build executable file from source:

```bash
yarn package
```

> Note: in CI we use `yarn build` as there is an action to package and publish the executables

#### Config file path

*Windows*: `%APPDATA%/Cerebro/config.json`

*Linux*: `$XDG_CONFIG_HOME/Cerebro/config.json`  or `~/.config/Cerebro/config.json`

*macOS*: `~/Library/Application Support/Cerebro/config.json`

### Resolve common issues

1. `AssertionError: Current node version is not supported for development` on npm postinstall.
After `yarn` postinstall script checks node version. If you see this error you have to check node and npm version in `package.json` `devEngines` section and install proper ones.

2. `Uncaught Error: Module version mismatch. Exepcted 50, got ...`
This error means that node modules with native extensions build with wrong node version (your local node version != node version, included to electron). To fix this issue run `cd ./app && yarn run rebuild`

### Conventional Commit Format

The project is using conventional commit specification to keep track of changes. This helps us with the realeases and enforces a consistent style.
You can commit as usually or use the following commands that will help you to commit with the right style:

* `yarn cz`
* `yarn commit`

### Publish a release

CerebroApp is using GH actions to build the app and publish it to a release. To publish a new release follow the steps below:

1. Update the version on both `package.json` and `app/package.json` files.
2. Create a release with from GH and publish it. 🚧 The release **tag** MUST contain the `v` prefix (❌ `0.1.2` → ✅`v0.1.2`).
3. Complete the name with a name and a description of the release.
4. The GH action is triggered and the release is updated when executables are built.

### Add dependencies

CerebroApp was created from an [old version of electron-react-boilerplate](https://github.com/cerebroapp/cerebro/commit/57b6e28c0f64beae8948cf17f099fa5d6236ae3c) and uses a two package.json file structure. If you are interested in developing a new feature, you should read about this structure in the [electron-react-boilerplate documentation](https://www.electron.build/tutorials/two-package-structure.html).


## License

MIT © [Cerebro App](https://github.com/cerebroapp/cerebro/blob/master/LICENSE)
