# Cerebro

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)

> Currently only OSx is supported

## Usage
Your can download .dmg for the latest version on  [releases](https://github.com/KELiON/cerebro/releases) page.

After installation use default shortcut `ctrl+space` to show an app window. You can customize this shortcut clicking on icon in menu bar → preferences.


## Plugins
### Core plugins
* Search & launch application, i.e. `spotify`;
* Search in the web with google suggestions;
* Navigate in file system with file previews (i.e. `~/Dropbox/passport.pdf`);
* Calculator;
* Smart converter. `15$`, `150 рублей в евро`, `100 eur in gbp`;
* Contacts search;
* Define in OSx built-in dictionary;
* System commands: i.e. `sleep`, `lock`, `restart`;
* Open system directory: `airdrop`, `icloud drive`, `trash`;

### Custom plugins
Use built-in `plugins` command to search and manage custom plugins.

* [cerebro-kill](https://github.com/KELiON/cerebro-kill) – kill process by name, i.e. `kill cerebro`;
* [cerebro-ip](https://github.com/KELiON/cerebro-ip) – show your local & external IP address;
* [cerebro-gif](https://github.com/KELiON/cerebro-gif) – search for relevant gif, i.e. `gif luck`, `how i met your mother gif`;
* [cerebro-emoj](https://github.com/KELiON/cerebro-emoj) – search for relevant emoji, like `emoj this is awesome`

## Development
### Create plugin
Check out [plugins documentation](./docs/plugins.md).

### Install

First, clone the repo via git:

```bash
git clone https://github.com/KELiON/cerebro.git your-project-name
```

And then install dependencies.

```bash
$ cd your-project-name && npm install
```


### Run
```bash
$ npm run dev
```

*Note: requires a node version >= 6 and an npm version >= 3.*

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
