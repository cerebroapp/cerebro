# Developing Cerebro

CerebroApp is an open source project and we welcome contributions from the community.
In this document you will find information about how Cerebro works and how to contribute to the project.

> ⚠️ NOTE: This document is for Cerebro developers. If you are looking for how to develop a plugin please check [plugin developers documentation](./plugins-developers).

## General architecture

Cerebro is based on [Electron](https://electronjs.org/) and [React](https://reactjs.org/).

A basic Electron app is composed of a *main process* and a *renderer process*. The main process is responsible for the app lifecycle, the renderer process is responsible for the UI.

In our case we use:

- [`app/main.development.js`](/app/main.development.js) as the main process
- [`app/main/main.js`](/app/main/main.js) as the main renderer process
- [`app/background/background.js`](/app/background/background.js) as a secondary renderer process

All this files are bundled and transpiled with [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/).

The build process is managed by [electron-builder](https://www.electron.build/).

### Two renderer processes

This two-renderer process architecture is used to keep the main renderer process (Cerebro) responsive and to avoid blocking the UI when executing long tasks.

When we need to execute a long task we send a message to the background process, which executes the task asynchronously and sends a message back to the main renderer when the task is completed.

This is the way we implement the plugins system. Their initializeAsync method is executed in the background process.

## Setting up the development environment

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 16)
- [yarn](https://classic.yarnpkg.com/en/)

### Install Cerebro

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

### Resolve common issues

1. `AssertionError: Current node version is not supported for development` on npm postinstall.
After `yarn` postinstall script checks node version. If you see this error you have to check node and npm version in `package.json` `devEngines` section and install proper ones.

2. `Uncaught Error: Module version mismatch. Exepcted 50, got ...`
This error means that node modules with native extensions build with wrong node version (your local node version != node version, included to electron). To fix this issue run `yarn --force`

### Conventional Commit Format

The project is using conventional commit specification to keep track of changes. This helps us with the realeases and enforces a consistent style.
You can commit as usually following this style or use the following commands that will help you to commit with the right style:

- `yarn cz`
- `yarn commit`

### Publish a release

CerebroApp is using GH actions to build the app and publish it to a release. To publish a new release follow the steps below:

1. Update the version on both `package.json` and `app/package.json` files.
2. Create a release with from GH and publish it. 🚧 The release **tag** MUST contain the `v` prefix (❌ `0.1.2` → ✅`v0.1.2`).
3. Complete the name with a name and a description of the release.
4. The GH action is triggered and the release is updated when executables are built.

### Add dependencies

CerebroApp was created from an [old version of electron-react-boilerplate](https://github.com/cerebroapp/cerebro/commit/57b6e28c0f64beae8948cf17f099fa5d6236ae3c) and uses a two package.json file structure. If you are interested in developing a new feature, you should read about this structure in the [electron-react-boilerplate documentation](https://www.electron.build/tutorials/two-package-structure.html).
