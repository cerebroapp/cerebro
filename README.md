# Cerebro

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]

![Cerebro](https://cloud.githubusercontent.com/assets/594298/20180624/858a483a-a75b-11e6-94a1-ef1edc4d95c3.gif)


## Usage
You can download latest version of Cerebro.dmg on [releases](https://github.com/KELiON/cerebro/releases) page.

After installation use default shortcut `ctrl+space` to show an app window. You can customize this shortcut by clicking on menu bar icon → preferences.


## Plugins
* Search & launch application, i.e. `spotify`;
* Search in the web with google suggestions;
* Navigate in file system with file previews (i.e. `~/Dropbox/passport.pdf`);
* Calculator;
* Smart converter. `15$`, `150 рублей в евро`, `100 eur in gbp`;
* Contacts search;
* Define in OSx built-in dictionary;
* Search for gifs on giphy.com, i.e. `gif luck`, `how i met your mother gif`;
* System commands: i.e. `sleep`, `lock`, `restart`;
* Open system directory: `airdrop`, `icloud drive`, `trash`;

And more geeky:
* Kill process, i.e `kill ruby`;
* Show your local and global IP address, just `ip`.

## Development
### Install

First, clone the repo via git:

```bash
git clone https://github.com/KELiON/cerebro.git your-project-name
```

And then install dependencies.

```bash
$ cd your-project-name && npm install
```


## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

*Note: requires a node version >= 4 and an npm version >= 2.*

## Package

```bash
$ npm run package
```

## License
MIT © [Alexandr Subbotin](https://github.com/KELiON)

[travis-image]: https://travis-ci.org/KELiON/cerebro.svg?branch=master
[travis-url]: https://travis-ci.org/KELiON/cerebro
[david_img]: https://img.shields.io/david/KELiON/cerebro.svg
[david_site]: https://david-dm.org/KELiON/cerebro
