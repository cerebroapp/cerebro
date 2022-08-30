# Cerebro

<img src="./build/icons/128x128.png" align="right"/>

## Usage

You can download the latest version on  [releases](https://github.com/cerebroapp/cerebro/releases) page.

After installation use default shortcut `ctrl+space` to show an app window. You can customize this shortcut clicking on icon in menu bar → preferences.

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)

## Plugins

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

### Create plugin

Check out [plugins documentation](./docs/plugins.md).

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

### Build executable from source

If you would like to install one version but the package is not published you can use this command to build executable file from source:

```bash
yarn package
```

> Note: in CI we use `yarn build` as there is an action to package and publish the executables

### Resolve common issues

1. `AssertionError: Current node version is not supported for development` on npm postinstall.
After `yarn` postinstall script checks node version. If you see this error you have to check node and npm version in `package.json` `devEngines` section and install proper ones.

2. `Uncaught Error: Module version mismatch. Exepcted 50, got ...`
This error means that node modules with native extensions build with wrong node version (your local node version != node version, included to electron). To fix this issue run `cd ./app && yarn run rebuild`

### Change Theme

Use shortcut `ctrl+space` to open app window and type `Cerebro Settings`. There you will be able to change the Theme (Currently Light and Dark Themes are supported out of the box)

![change-cerebro-theme](https://user-images.githubusercontent.com/24854406/56137765-5880ca00-5fb7-11e9-86d0-e740de1127c2.gif)

#### Config file path

*Windows*: `%APPDATA%/Cerebro/config.json`

*Linux*: `$XDG_CONFIG_HOME/Cerebro/config.json`  or `~/.config/Cerebro/config.json`

*macOS*: `~/Library/Application Support/Cerebro/config.json`

## For developers

### Publish a release

CerebroApp is using GH actions to build the app and publish it to a release. To publish a new release follow the steps below:

1. Update the version on both `package.json` and `app/package.json` files.
2. Create a release with from GH and publish it. 🚧 The release **tag** MUST contain the `v` prefix (❌ `0.1.2` → ✅`v0.1.2`).
3. Complete the name with a name and a description of the release.
4. The GH action is triggered and the release is updated when executables are built.

### Add dependencies

CerebroApp was created from an [old version of electron-react-boilerplate](https://github.com/cerebroapp/cerebro/commit/57b6e28c0f64beae8948cf17f099fa5d6236ae3c) and uses a two package.json file structure. If you are interested in developing a new feature, you should read about this structure in the [electron-react-boilerplate documentation](https://www.electron.build/tutorials/two-package-structure.html).

# Support

### Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/cerebro#backer)]

<a href="https://opencollective.com/cerebro/backer/0/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/1/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/2/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/3/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/4/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/5/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/6/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/7/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/8/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/9/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/10/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/11/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/12/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/13/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/14/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/15/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/16/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/17/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/18/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/19/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/20/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/21/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/22/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/23/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/24/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/25/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/26/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/27/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/28/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/backer/29/website" target="_blank"><img src="https://opencollective.com/cerebro/backer/29/avatar.svg"></a>

### Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/cerebro#sponsor)]

<a href="https://opencollective.com/cerebro/sponsor/0/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/1/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/2/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/3/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/4/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/5/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/6/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/7/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/8/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/9/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/10/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/11/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/12/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/13/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/14/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/15/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/16/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/17/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/18/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/19/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/20/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/21/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/22/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/23/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/24/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/25/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/26/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/27/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/28/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/cerebro/sponsor/29/website" target="_blank"><img src="https://opencollective.com/cerebro/sponsor/29/avatar.svg"></a>

## License

MIT © [Cerebro App](https://github.com/cerebroapp/cerebro/blob/master/LICENSE)
