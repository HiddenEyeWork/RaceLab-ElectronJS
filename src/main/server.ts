import { BrowserWindow } from "electron";

declare var SERVER_WINDOW_WEBPACK_ENTRY: string;

export let serverWindow: BrowserWindow | null;

export const createServerWindow = () => {
  const isDev = process.env.NODE_ENV === "development";
  // Create a hidden browser window.
  serverWindow = new BrowserWindow({
    height: 600,
    show: isDev,
    webPreferences: {
      devTools: isDev,
      backgroundThrottling: false,
      nodeIntegration: true,
      // enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    },
    width: 800,
  });

  // and load the index.html of the app.
  serverWindow.loadURL(SERVER_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  serverWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  serverWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    serverWindow = null; // tslint:disable-line: no-null-keyword
  });
};
