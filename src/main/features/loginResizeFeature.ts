import { BrowserWindow } from "electron";
import { cockpitWindowHeight, cockpitWindowWidth } from "../cockpitWindow";
import { MainEvents } from "../MainEvents";

export const LoginResizeFeature = (w: BrowserWindow | null) => {
  if (!w) {
    return;
  }

  MainEvents.changeToLoginScreenSize.on(() => {
    if (!w) {
      return;
    }

    w.setResizable(true);
    w.setSize(800, 480, true);
    w.center();
    w.setResizable(false);
  });

  MainEvents.changeToAuthenticatedScreenSize.on(() => {
    w.setResizable(true);
    w.setSize(cockpitWindowWidth, cockpitWindowHeight, true);
    w.center();
    w.setResizable(false);
  });
};
