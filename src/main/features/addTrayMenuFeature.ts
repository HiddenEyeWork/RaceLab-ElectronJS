import { Menu, Tray } from "electron";
import { app } from "electron";
import path from "path";

import { EnvironmentHelper } from "../../renderer/shared/helpers/EnvironmentHelper";
import { cockpitWindow } from "../cockpitWindow";
import { clientWindow } from "../overlayHost";
import { serverWindow } from "../serverWindow";
import packagejson from "./../../../package.json";

export const AddTrayMenuFeature = () => {
  if (process.platform == "darwin") {
    return;
  }

  let resourcesPath = process.resourcesPath;
  if (EnvironmentHelper.isDevelopment()) {
    resourcesPath = "./resources/icons/";
  } else {
    resourcesPath += "/icons/";
  }

  const icon = path.resolve(resourcesPath + "logo-32.ico");

  let tray = new Tray(icon);

  tray.on("double-click", () => {
    if (cockpitWindow) {
      cockpitWindow.show();
    }
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "Open",
      click() {
        if (cockpitWindow) {
          cockpitWindow.show();
        }
      },
    },
    {
      label: "Quit",
      click() {
        //interfaceWindow && interfaceWindow.close();
        cockpitWindow && cockpitWindow.close();
        clientWindow && clientWindow.close();
        serverWindow && serverWindow.close();
        app.quit();
      },
    },
  ]);

  tray.setToolTip(packagejson.productName);
  tray.setContextMenu(menu);

  return tray;
};
