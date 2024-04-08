import { EnvironmentHelper } from "../renderer/shared/helpers/EnvironmentHelper";
import { MainEvents } from "./MainEvents";
import { AppFocusFeature } from "./features/appFocusFeature";
import { BrowserWindow, app, shell } from "electron";

declare var COCKPIT_WINDOW_WEBPACK_ENTRY: string;

export let cockpitWindow: BrowserWindow | null;
export let cockpitWindowWidth = 1440 + 48;
export let cockpitWindowHeight = 924;

export const createCockpitWindow = (options: any) => {
  const isDev = EnvironmentHelper.isDevelopment();

  // Create the browser window.
  cockpitWindow = new BrowserWindow({
    frame: false,
    height: cockpitWindowHeight,
    webPreferences: {
      allowRunningInsecureContent: true,
      devTools: isDev,
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
    },
    width: cockpitWindowWidth,
    backgroundColor: "white",
    resizable: false,
    show: !options.StartMinimized,
  });

  if (isDev) {
    cockpitWindow.webContents.openDevTools();
  }

  cockpitWindow.webContents.on("will-navigate", (event, url) => {
    event.preventDefault();

    shell.openExternal(url);
  });

  cockpitWindow.loadURL(COCKPIT_WINDOW_WEBPACK_ENTRY);

  cockpitWindow.on("close", (event: any) => {
    MainEvents.closeApplication.emit();
  });

  cockpitWindow.on("closed", (event: any) => {
    event?.preventDefault();
    app?.quit();
    cockpitWindow = null; // tslint:disable-line: no-null-keyword
  });

  //TODO: haven't found any evidence that this is needed
  cockpitWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);

    return { action: "deny" };
  });

  AppFocusFeature(cockpitWindow);
};
