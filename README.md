# Cerebro

> Cerebro is an open-source launcher to improve your productivity and efficiency

<img src="./build/icons/128x128.png" align="right"/>

## Usage

You can download the latest version on  [releases](https://github.com/cerebroapp/cerebro/releases) page.

- If there is not installer for your OS check [build instructions](#build-executable-from-source).
- If you are a linux user see [how to install the executable](#install-executable-on-linux)

After installation use the default shortcut `ctrl+space` to show the app window. You can customize this shortcut clicking on the icon in the menu bar and then selecting "Preferences...".

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)

### Plugins

### Core plugins

- Search in the web with your favourite search engine
- Search & launch application, i.e. `spotify`
- Navigate in file system with file previews (i.e. `~/Dropbox/passport.pdf`)
- Calculator
- Smart converter. `15$`, `150 рублей в евро`, `100 eur in gbp`;

### Install plugins

You can manage and install more plugins by typing `plugins <plugin-name>` in the Cerebro search bar.

Discover plugins and more at [Cerebro's Awesome List](https://github.com/lubien/awesome-cerebro).

> If you are interested in creating your own plugin, check the [plugins documentation](./docs/plugins-developers.md).

## Shortcuts

Cerebro provides several shortcuts to improve your productivity:

- `ctrl+c`: copy the result from a plugin to the clipboard, if the plugin does not provida a result, the term you introduced will be copied
- `ctrl+1...9`: select directly a result from the list
- `ctrl+[hjkl]`: navigate through the results using vim-like keys (Also `ctrl+o` to select the result)

### Change Theme

Use shortcut `ctrl+space` to open app window and type `Cerebro Settings`. There you will be able to change the Theme.

> Currently Light and Dark Themes are supported out of the box

![change-cerebro-theme](https://user-images.githubusercontent.com/24854406/56137765-5880ca00-5fb7-11e9-86d0-e740de1127c2.gif)

### Config file path

You can find the config file in the following path depending on your OS:

*Windows*: `%APPDATA%/Cerebro/config.json`

*Linux*: `$XDG_CONFIG_HOME/Cerebro/config.json`  or `~/.config/Cerebro/config.json`

*macOS*: `~/Library/Application Support/Cerebro/config.json`

> ⚠️ A bad configuration file can break Cerebro. If you are not sure about what you are doing, don't edit the config file directly.

## Build executable from source

If you would like to install one version of Cerebro but the executable has not been released you can follow this isntruction to build it from source:

1. Clone the repository
2. Install dependencies with `yarn`

3. ```bash
    yarn package
   ```

> Note: in CI we use `yarn build` as there is an action to package and publish the executables

## Install executable on Linux

If you are a linux user you might need to grant execution permissions to the executable. To do so, open the terminal and run the following command:

```bash
sudo chmod +x <path to the executable>
```

Then you can install the executable by running the following command:

- If you are using the AppImage executable:

  ```bash
  ./<path to the executable>
  ```

- If you are using the deb executable:

  ```bash
  dpkg -i <path to the executable>
  ```

> In some computers you might need run these commands with elevated privileges (sudo). `sudo ./<path to the executable>` or `sudo dpkg -i <path to the executable>`

## Contributing

PRs are welcome! You can get a general idea of how Cerebro works by reading the [developer guide](/docs/cerebro-developers.md).

## License

MIT © [Cerebro App](https://github.com/cerebroapp/cerebro/blob/master/LICENSE)
