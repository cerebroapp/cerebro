# Cerebro

<img src="./build/icons/128x128.png" align="right"/>

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]
[![OpenCollective](https://opencollective.com/cerebro/backers/badge.svg)](#backers) 
[![OpenCollective](https://opencollective.com/cerebro/sponsors/badge.svg)](#sponsors)

## Usage
Your can download the latest version on  [releases](https://github.com/KELiON/cerebro/releases) page.

After installation use default shortcut `ctrl+space` to show an app window. You can customize this shortcut clicking on icon in menu bar → preferences.

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)

## Plugins
### Core plugins
* Search in the web with google suggestions;
* Search & launch application, i.e. `spotify`;
* Navigate in file system with file previews (i.e. `~/Dropbox/passport.pdf`);
* Calculator;
* Smart converter. `15$`, `150 рублей в евро`, `100 eur in gbp`;

### Custom plugins
Use built-in `plugins` command to search and manage custom plugins.

#### macOS only plugins
* [macOS Contacts](https://github.com/KELiON/cerebro-osx-contacts) – search in contacts.app;
* [macOS Define](https://github.com/KELiON/cerebro-osx-define) – define in OSx built-in dictionary;
* [macOS Eject](https://github.com/codingmatty/cerebro-plugin-osx-eject) – safely eject mounted volume drives;
* [macOS System](https://github.com/KELiON/cerebro-osx-system) – system commands: i.e. `sleep`, `lock`, `restart`, `empty trash` or open system directories, like `trash` or `airdrop`;

#### Plugins for all platforms
* [Caniuse](https://github.com/KELiON/cerebro-caniuse) – quick access to [caniuse.com](http://caniuse.com) database;
* [Devdocs](https://github.com/KELiON/cerebro-devdocs) – search in dev. documentations provided by [devdocs.io](http://devdocs.io)
* [Emoj](https://github.com/KELiON/cerebro-emoj) – search for relevant emoji, like `emoj this is awesome`;
* [Gif](https://github.com/KELiON/cerebro-gif) – search for relevant gif, i.e. `gif luck`, `how i met your mother gif`;
* [Google Knowledge Graph](https://github.com/Kageetai/cerebro-gkg) – Get info from the [Google Knowledge Graph](https://www.google.com/intl/bn/insidesearch/features/search/knowledge.html) for your query;
* [Hash](https://github.com/codingmatty/cerebro-plugin-hash) – hash input text with popular hash algorithms (i.e. md5, sha1, etc);
* [IMDB](https://github.com/KELiON/cerebro-imdb) – search for films on imdb.com with rating and details, like `imdb star wars`;
* [IP](https://github.com/KELiON/cerebro-ip) – show your local & external IP address;
* [Kill](https://github.com/KELiON/cerebro-kill) – kill process by name, i.e. `kill cerebro`;
* [Lipsum](https://github.com/codingmatty/cerebro-plugin-lipsum) – generate lorem ipsum text from [lipsum.com](http://www.lipsum.com);
* [Shell](https://github.com/KELiON/cerebro-shell) – exec shell commands without running terminal;
* [Stackoverflow](https://github.com/BrainMaestro/cerebro-stackoverflow) – search for answers to questions on stackoverflow;

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

## Support
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
MIT © [Alexandr Subbotin](https://github.com/KELiON)

[travis-image]: https://travis-ci.org/KELiON/cerebro.svg?branch=master
[travis-url]: https://travis-ci.org/KELiON/cerebro
[david_img]: https://img.shields.io/david/KELiON/cerebro.svg
[david_site]: https://david-dm.org/KELiON/cerebro
