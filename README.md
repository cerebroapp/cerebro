# Cerebro

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)

## Usage
Your can download the latest version on  [releases](https://github.com/KELiON/cerebro/releases) page.

After installation use default shortcut `ctrl+space` to show an app window. You can customize this shortcut clicking on icon in menu bar → preferences.


## Plugins
### Core plugins
* Search in the web with google suggestions;
* Search & launch application, i.e. `spotify`;
* Navigate in file system with file previews (i.e. `~/Dropbox/passport.pdf`);
* Calculator;
* Smart converter. `15$`, `150 рублей в евро`, `100 eur in gbp`;

### Custom plugins
Use built-in `plugins` command to search and manage custom plugins.

#### OSx only plugins
* [OSx System](https://github.com/KELiON/cerebro-osx-system) – system commands: i.e. `sleep`, `lock`, `restart`, `empty trash` or open system directories, like `trash` or `airdrop`;
* [OSx Define](https://github.com/KELiON/cerebro-osx-define) – define in OSx built-in dictionary;
* [OSx Contacts](https://github.com/KELiON/cerebro-osx-contacts) – search in contacts.app;

#### Plugins for all platforms
* [Kill](https://github.com/KELiON/cerebro-kill) – kill process by name, i.e. `kill cerebro`;
* [IP](https://github.com/KELiON/cerebro-ip) – show your local & external IP address;
* [Gif](https://github.com/KELiON/cerebro-gif) – search for relevant gif, i.e. `gif luck`, `how i met your mother gif`;
* [Emoj](https://github.com/KELiON/cerebro-emoj) – search for relevant emoji, like `emoj this is awesome`;
* [IMDB](https://github.com/KELiON/cerebro-imdb) – search for films on imdb.com with rating and details, like `imdb star wars`;
* [Shell](https://github.com/KELiON/cerebro-shell) – exec shell commands without running terminal;

## Development
### Create plugin
Check out [plugins documentation](./docs/plugins.md).

### Install

First, clone the repo via git:

```bash
git clone https://github.com/KELiON/cerebro.git cerebro
```

And then install dependencies.

```bash
$ cd cerebro && npm install && cd ./app && npm install && cd ../
```

### Run
```bash
$ npm run dev
```

> Note: requires a node version 6.* and an npm version 3.*

### Resolve common issues
1. `AssertionError: Current node version is not supported for development` on npm postinstall.
After `npm install` postinstall script checks node & npm to match required versions. If you see this error you have to check node and npm version in `package.json` `devEngines` section and install proper ones.

2. `Uncaught Error: Module version mismatch. Exepcted 50, got ...`
This error means that node modules with native extensions build with wrong node version (your local node version != node version, included to electron). To fix this issue run `cd ./app && npm run rebuild`



### Package
Use this command to build `.app` file:

```bash
$ npm run package
```


## Be in touch
Follow to be notified about new releases or learn some productivity tips with Cerebro:

* [Twitter](https://twitter.com/cerebro_app)
* [Facebook](https://www.facebook.com/cerebroapp)
* [Google+](https://plus.google.com/104292436165594177472)
* [VK.com](https://vk.com/cerebroapp) – channel in Russian

Or [subscribe to newsletter](http://eepurl.com/coiKU9) to be notified only about big releases.


## License
MIT © [Alexandr Subbotin](https://github.com/KELiON)

[travis-image]: https://travis-ci.org/KELiON/cerebro.svg?branch=master
[travis-url]: https://travis-ci.org/KELiON/cerebro
[david_img]: https://img.shields.io/david/KELiON/cerebro.svg
[david_site]: https://david-dm.org/KELiON/cerebro
