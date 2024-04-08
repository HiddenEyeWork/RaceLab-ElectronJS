// https://www.electronforge.io/config/makers/squirrel.windows#my-app-is-launching-multiple-times-during-install
import { app } from "electron";
import logger from "electron-log";
import { autoUpdater } from "electron-updater";

// tslint:disable-next-line: no-var-requires
if (require("electron-squirrel-startup")) {
  app.quit();
}

logger.transports.file.level = "info";
autoUpdater.logger = logger;

/*
autoUpdater
  .checkForUpdatesAndNotify()
  .then((a) => {
    console.log("update ready?");
    console.log("current version", autoUpdater.currentVersion);
    console.log(a?.updateInfo);
  })
  .catch((err) => {
    console.log("error downloading new version", err);
  });
  */

/*
autoUpdater.on("error", (ex) => {
  logger.log("autoupdater error:", ex);
});

autoUpdater.on("checking-for-update", (ex) => {
  logger.log("autoupdater checking-for-update:", ex);
});

autoUpdater.on("update-available", (ex) => {
  logger.log("autoupdater update-available:", ex);
});

autoUpdater.on("update-not-available", (ex) => {
  logger.log("autoupdater update-not-available:", ex);
});

autoUpdater.on("download-progress", (ex) => {
  logger.log("autoupdater download-progress:", ex);
});
*/
