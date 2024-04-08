import { app, BrowserWindow, shell } from "electron";

declare var INTERFACE_WINDOW_WEBPACK_ENTRY: string;

export let interfaceWindow: BrowserWindow | null;

export const createInterfaceWindow = () => {
  const isDev = process.env.NODE_ENV === "development";

  // Create the browser window.
  interfaceWindow = new BrowserWindow({
    frame: false,
    height: 750,
    minHeight: 500,
    webPreferences: {
      allowRunningInsecureContent: true,
      devTools: isDev,
      nodeIntegration: true,
    },
    width: 1080,
    minWidth: 1080,
    resizable: false,
  });

  interfaceWindow.webContents.on("will-navigate", (event, url) => {
    console.log("will-navigate prevented interface.ts", url);

    event.preventDefault();
    shell.openExternal(url);
  });

  // and load the index.html of the app.
  interfaceWindow.loadURL(INTERFACE_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  // interfaceWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  interfaceWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    interfaceWindow = null; // tslint:disable-line: no-null-keyword
    app.quit();
  });

  //@ts-ignore
  interfaceWindow.webContents.on("new-window", function (e, url) {
    console.log("prevent new-window interface.ts", url);

    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  /*interfaceWindow.on("minimize", function(event: any) {
    event.preventDefault();

    if (interfaceWindow) {
      interfaceWindow.hide();
    }
  });*/
};
