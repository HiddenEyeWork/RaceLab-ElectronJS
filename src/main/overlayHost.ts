import { BrowserWindow, screen } from "electron";
declare var OVERLAY_HOST_WINDOW_WEBPACK_ENTRY: string;

export let clientWindow: BrowserWindow | null;

export const createOverlayHostWindow = () => {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  clientWindow = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    height,
    transparent: true,
    width,
    webPreferences: {
      backgroundThrottling: false,
      experimentalFeatures: true,
    },
  });

  // and load the index.html of the app.
  clientWindow.loadURL(OVERLAY_HOST_WINDOW_WEBPACK_ENTRY);
  clientWindow.setIgnoreMouseEvents(true);

  /**
   * BEGIN: background throttle fix
   * https://github.com/electron/electron/issues/9567
   * According to this ticket, this is the way to disable background throttling completely.
   */
  clientWindow.hide();
  clientWindow.minimize();
  clientWindow.setMovable(false);
  clientWindow.setFocusable(false);
  clientWindow.setEnabled(false);
  //the above seem to set throttling to true so call this last to set back to false
  clientWindow.webContents.setBackgroundThrottling(false);
  /**
   * END: background throttle fix
   */

  // Open the DevTools.
  // clientWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  clientWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    clientWindow = null; // tslint:disable-line: no-null-keyword
  });
};
