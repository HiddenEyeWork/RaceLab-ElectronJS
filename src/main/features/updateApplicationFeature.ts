import { ProgressInfo, UpdateDownloadedEvent, autoUpdater } from "electron-updater";
import { UpdateInfo } from "electron-updater";

import { IPC_TOPICS } from "../../renderer/shared/enums/RendererEventsEnum";

import { MainEvents } from "../MainEvents";
import { willExpireSoon } from "../killSwitch";

const init = () => {
  MainEvents.checkForUpdatePending.on((args, event) => {
    console.log("check for update event received. checking...");

    const sender = event?.sender;

    if (!sender) {
      return;
    }

    // forcing the update on exit if the app is going to expire in 4 weeks
    if (willExpireSoon) {
      autoUpdater.autoInstallOnAppQuit = true;
      autoUpdater.autoDownload = true;
      // otherwise it's up to the user when to update
    } else {
      autoUpdater.autoInstallOnAppQuit = false;
      autoUpdater.autoDownload = false;
    }

    autoUpdater.checkForUpdates();

    autoUpdater.signals.updateDownloaded((info: UpdateDownloadedEvent) => {
      console.log("downloaded", info);
      sender.send(IPC_TOPICS.CHECK_FOR_UPDATE_SUCCESS, {
        version: info.version,
      } as UpdateInfo);
      sender.send(IPC_TOPICS.DOWNLOAD_PROGRESS, {
        percent: 100,
      } as ProgressInfo);
    });

    autoUpdater.once("update-available", (info: UpdateInfo) => {
      sender.send(IPC_TOPICS.CHECK_FOR_UPDATE_SUCCESS, info);
      console.log("update available event fired", info);
    });

    autoUpdater.once("update-not-available", () => {
      sender.send(IPC_TOPICS.CHECK_FOR_UPDATE_FAILURE);
      console.log("update is not available event fired");
    });

    autoUpdater.on("download-progress", (ex: ProgressInfo) => {
      sender.send(IPC_TOPICS.DOWNLOAD_PROGRESS, ex);
      console.log("autoupdater download-progress:", ex);
    });
  });

  MainEvents.triggerDownloadManually.on(() => {
    autoUpdater.downloadUpdate();
  });

  MainEvents.triggerUpdateNow.on(() => {
    autoUpdater.quitAndInstall();
  });
};

export const UpdateApplicationFeature = {
  init,
};
