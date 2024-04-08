# Race Lab Apps

## First time setup

### Install deps

Recommended node version: 18.16.1

```terminal
yarn
```

### Dev environment

- [VSCode](https://code.visualstudio.com) with these extensions

  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker).
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).
  - [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens).
  - [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one).
  - [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree).
  - [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode).
  - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).
  - [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin).
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
  - [Graphviz Interactive Preview](https://marketplace.visualstudio.com/items?itemName=tintinweb.graphviz-interactive-preview)

- [Nodejs](https://nodejs.org) 10 or later

## Terminal commands

To install servicestack command line utilities (used for dto generation), install:

```terminal
  npm install -g @servicestack/cli
```

### Run in dev environment

```terminal
yarn start
```

For webpack logs, visit: http://localhost:9000

#### To restart main process

while running, just type `rs` on the terminal

#### To refresh renderer code

just modify the code (JS/TS, HTML or SCSS/CSS)

### Make distributable

```terminal
yarn make
```

### Package the app

```terminal
yarn package
```

## Project structure

### Main process

Located in `src/main/*`

This code is for setting up the application, no more no less.

### Cockpit window

Located in `src/renderer/cockpit/*`

The cockpit window, basically an electron window that loads React code.

### Local server (hidden window)

Located in `src/renderer/server/*`

An express application that:

- Works as backend, consume the game's data, convert it and serve it in the right format for front-end widgets.

- Serves frontend files, to be consumed by the browser using the URL.

### Ovelay host window (transparent window)

Located in `src/renderer/overlayHost/*`

A transparent always-on-top window, that loads React application and display widgets on the screen, also it consumes the information from the backend.

## Notices

### node-irsdk

To recompile the package for Electron, you need [MSBuild tools](https://github.com/nodejs/node-gyp/#on-windows), and it's a one-time compile task for each dev machine, all you need to do is run the command:

```terminal
yarn start
```

and ElectronForge will take care of the compiling process.

You may need to run the following command to install native dependencies

```terminal
npm install --global --production windows-build-tools
npm install --global node-gyp
```

### Configure refresh on code change

Because ElectronForge does not use [webpack-dev-server](https://github.com/webpack/webpack-dev-server) (which we can tweak its config), and used instead two lightweight packages: [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) and [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware), when the code changes, the page [fails to reload](https://gitlab.com/programtervezo/racelabapps/issues/16).

Until they [fix this issue](https://github.com/electron-userland/electron-forge/pull/1281), you have to stick with a [workaround solution](https://gitlab.com/programtervezo/racelabapps/issues/16#note_245774779), which is very simple, you just need to modify the line 8 on this file:

[./node_modules/webpack-hot-middleware/client.js](./node_modules/webpack-hot-middleware/client.js)

from:

```js
  reload: false,
```

to:

```js
  reload: true,
```

on every change made to node_modules folder, typically after running `yarn add` or `yarn remove` ...etc

### Publishing

To publish a new version, simply update the package.json version, then run

```terminal
yarn pub
```

NOTICE:

After you run `yarn add/remove`, you can't directly after it publish make or package, but instead you should run `yarn start` to rebuild the native modules against electron again, because they got reset when running the first command.
