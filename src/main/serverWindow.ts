import { BrowserWindow, app } from "electron";

import { EnvironmentHelper } from "../renderer/shared/helpers/EnvironmentHelper";

declare var SERVER_WINDOW_WEBPACK_ENTRY: string;

export let serverWindow: BrowserWindow | null;

export const createServerWindow = () => {
  const isDev = EnvironmentHelper.isDevelopment();
  // Create a hidden browser window.
  serverWindow = new BrowserWindow({
    height: 600,
    show: isDev,
    webPreferences: {
      devTools: isDev,
      backgroundThrottling: false,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    width: 800,
  });

  // and load the index.html of the app.
  serverWindow.loadURL(SERVER_WINDOW_WEBPACK_ENTRY);

  serverWindow.webContents.setBackgroundThrottling(false);

  if (isDev) {
    // Open the DevTools.
    serverWindow.webContents.openDevTools();
  }

  // Fixing a bug in electrton that is very hard to reproduce. This issue is that the server process SOMETIMES does not quit when user closes the application.
  // this is making sure it happens, sort of forcing it.
  serverWindow.on("closed", (event: any) => {
    event?.preventDefault();
    app?.quit();
    serverWindow = null; // tslint:disable-line: no-null-keyword
  });

  // Emitted when the window is closed.
  serverWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    serverWindow = null; // tslint:disable-line: no-null-keyword
  });

  serverWindow.webContents.on("render-process-gone", (e) => {
    app.relaunch();
    app.quit();
  });
};
