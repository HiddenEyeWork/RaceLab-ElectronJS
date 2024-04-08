import { EnvironmentHelper } from "../renderer/shared/helpers/EnvironmentHelper";
import { MainEvents } from "./MainEvents";
import { cockpitWindow, createCockpitWindow } from "./cockpitWindow";
import { AddTrayMenuFeature } from "./features/addTrayMenuFeature";
import { AutoLaunchFeature } from "./features/autoLaunchFeature";
import { OverlayWindowFeature } from "./features/browserWindowFeature";
import { DownloadApiFileFeature } from "./features/downloadApiFileFeature";
import { GlobalShortCutFeature } from "./features/globalShortcutFeature";
import { LoginResizeFeature } from "./features/loginResizeFeature";
import { rendererProcessesReadyFeature } from "./features/rendererProcessesReadyFeature";
import { UpdateApplicationFeature } from "./features/updateApplicationFeature";
import { clientWindow, createOverlayHostWindow } from "./overlayHost";
import { createServerWindow, serverWindow } from "./serverWindow";
import "./update";
import { app, ipcMain, shell } from "electron";
import electronDl from "electron-dl";
import { IPC_TOPICS } from "../renderer/shared/enums/RendererEventsEnum";
import { IApplicationSettings, ISystemSettings } from "../renderer/shared/store/IStore";
import { nameOf } from "../renderer/shared/utils/NameOf";

declare var OVERLAY_HOST_WINDOW_WEBPACK_ENTRY: string;
declare var SERVER_WINDOW_WEBPACK_ENTRY: string;

// remove debug logs in production
if (EnvironmentHelper.isProduction()) {
  console.debug = () => {};
}

require("@electron/remote/main").initialize();

app.commandLine.appendSwitch("disable-background-timer-throttling");
//app.commandLine.appendSwitch("ignore-certificate-errors", "true");
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
app.commandLine.appendSwitch("disable-site-isolation-trials");

//app.commandLine.appendSwitch("disable-http-cache");
//powerSaveBlocker.start("prevent-display-sleep");

// added this zoom factor to the default settings, so current users won't be affected by it => less problems with the update
// update: on big screens this is not a good solution. The app is too small.
// if (systemSettings?.DefaultZoomFactor) {
// app.commandLine.appendSwitch("high-dpi-support", "1");
// app.commandLine.appendSwitch("force-device-scale-factor", "1");
// }

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// tslint:disable-next-line: no-var-requires
if (require("electron-squirrel-startup")) {
  app.quit();
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (cockpitWindow) {
      if (cockpitWindow.isMinimized()) {
        cockpitWindow.restore();
      }

      cockpitWindow.show();
      cockpitWindow.focus();
    }
  });

  // Don't delete it. If we don't have the tray instance here,
  // then the GC will swoop it up and we won't have tray menu or tray icon at all.
  let tray = null;

  electronDl();

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", () => {
    ipcMain.on("get-overlayhost-path", (e) => {
      e.returnValue = OVERLAY_HOST_WINDOW_WEBPACK_ENTRY;
    });

    rendererProcessesReadyFeature(() => {
      //TODO: some concern about this call. I'm not sure if we call this in time. At this time there might be events these renderer windows send, which would be missed completely.
      // maybe wait for the ALL_RENDER event in the cockpit window and sever window before doing anything
      // DO NOT move this into a separate feature method outside of this context.
      // these windows have references to the current instance and we need to stay here
      const allListeners: { [key in IPC_TOPICS]: any } = {} as any;

      Object.values(IPC_TOPICS).map((e) => {
        const aListener = (event: Electron.IpcMainEvent, args: any[]) => {
          console.debug("BROADCASTING EVENT ======================", e);
          [cockpitWindow, serverWindow].map((rendererWindow) => {
            if (rendererWindow?.isDestroyed()) {
              return;
            }

            rendererWindow?.webContents.send(e, args);
          });
        };

        ipcMain.on(e, aListener);

        allListeners[e] = aListener;
      });

      OverlayWindowFeature.init([cockpitWindow, serverWindow]);

      return () => {
        console.debug("removing all broadcasting listeners");

        Object.values(IPC_TOPICS).map((e) => {
          ipcMain.removeListener(e, allListeners[e]);
        });
      };
    });

    tray = AddTrayMenuFeature();

    createCockpitWindow({
      StartMinimized: false,
    });
    createServerWindow();

    const myglobal: IGlobal = global as unknown as IGlobal;

    myglobal.sharedObject = {
      cockpitWindowId: cockpitWindow && cockpitWindow.id,
      serverWindowId: serverWindow && serverWindow.id,
    };

    LoginResizeFeature(cockpitWindow);
    AutoLaunchFeature();
    // GlobalShortCutFeature(serverWindow, systemSettings).register();
    DownloadApiFileFeature.init();

    MainEvents.showItemInFolder.on(async (eventParams) => {
      if (!eventParams) {
        return;
      }

      const { path } = eventParams;

      shell.openPath(path);
    });

    // Fixing a bug in electrton that is very hard to reproduce. This issue is that the server process SOMETIMES does not quit when user closes the application.
    // this is making sure it happens, sort of forcing it.
    MainEvents.closeApplication.on(() => {
      if (!serverWindow?.isDestroyed()) {
        serverWindow?.destroy();
      }

      if (!clientWindow?.isDestroyed()) {
        clientWindow?.destroy();
      }

      app?.quit();
    });

    UpdateApplicationFeature.init();

    if (!serverWindow && !cockpitWindow) {
      throw Error("Server or interface was not initialized. Quitting.");
    }
  });

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (cockpitWindow === null) {
      createCockpitWindow({
        StartMinimized: false,
      });
    }

    if (serverWindow === null) {
      createServerWindow();
    }
    if (clientWindow === null) {
      createOverlayHostWindow();
    }
  });

  app.on("browser-window-created", (_, window) => {
    require("@electron/remote/main").enable(window.webContents);
  });
}

export interface IGlobal extends NodeJS.Global {
  sharedObject: {
    cockpitWindowId: number | null;
    serverWindowId: number | null;
  };
}
