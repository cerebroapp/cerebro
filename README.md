# Cerebro

<img src="./build/icons/128x128.png" align="right"/>

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]
[![OpenCollective](https://opencollective.com/cerebro/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/cerebro/sponsors/badge.svg)](#sponsors)

## Usage
You can download the latest version on  [releases](https://github.com/KELiON/cerebro/releases) page.

After installation use default shortcut `ctrl+space` to show an app window. You can customize this shortcut clicking on icon in menu bar → preferences.

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)

## Plugins
### Core plugins
* Search in the web with google suggestions;
* Search & launch application, i.e. `spotify`;
* Navigate in file system with file previews (i.e. `~/Dropbox/passport.pdf`);
* Calculator;
* Smart converter. `15$`, `150 рублей в евро`, `100 eur in gbp`;

### Install and manage custom plugins
Use built-in `plugins` command to search and manage custom plugins.

Discover plugins and more at [Cerebro's Awesome List](https://github.com/lubien/awesome-cerebro).

## Development

If you have any questions feel free to chat in gitter: https://gitter.im/KELiON-cerebro.

### Create plugin
Check out [plugins documentation](./docs/plugins.md).

### Install

First, clone the repo via git:

```bash
$ git clone https://github.com/KELiON/cerebro.git cerebro
```

And then install dependencies:

```bash
$ cd cerebro && yarn && cd ./app && yarn && cd ../
```

### Run
```bash
$ yarn run dev
```

> Note: requires a node version >=6.x

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


### Package
Use this command to build `.app` file:

```bash
$ yarn run package
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
