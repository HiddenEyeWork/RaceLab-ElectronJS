import { app, BrowserWindow } from "electron";
import { MainEvents } from "../MainEvents";

export const AppFocusFeature = (win: BrowserWindow) => {
  MainEvents.bringAppToFocus.on(() => {
    app.focus();

    if (!win) {
      return;
    }

    win.blur();
    win.focus();
    win.setAlwaysOnTop(true);

    setTimeout(() => {
      win && win.setAlwaysOnTop(false);
    }, 1000);
  });
};
