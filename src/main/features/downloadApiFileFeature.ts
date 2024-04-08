import { BrowserWindow, session } from "electron";
import { download } from "electron-dl";

import { IPC_TOPICS } from "../../renderer/shared/enums/RendererEventsEnum";

import { MainEvents } from "../MainEvents";

const init = () => {
  MainEvents.downloadApiFileRequest.on((downloadFileParams, event) => {
    if (!downloadFileParams) {
      return;
    }

    const { url, destinationFolder, accessToken } = downloadFileParams;
    const win = BrowserWindow.getFocusedWindow();
    const sender = event?.sender;

    //todo check if this is a global setup (i hope it is), so we'll only need to set it up once in a better place
    const filter = {
      urls: ["http://*/*", "https://*/*"],
    };
    session.defaultSession!.webRequest.onBeforeSendHeaders(filter, (details: any, callback) => {
      details.requestHeaders["authorization"] = `Bearer ${accessToken}`;
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    if (!win) {
      sender?.send(IPC_TOPICS.DOWNLOAD_API_FILE_DOWNLOADED, {
        downloadKey: downloadFileParams.downloadKey,
      });
      return;
    }

    let finished = false;
    download(win, url, {
      directory: destinationFolder,
      saveAs: false,

      onProgress: (params) => {
        if (params.percent == 100) {
          if (finished) {
            return;
          }

          sender?.send(IPC_TOPICS.DOWNLOAD_API_FILE_DOWNLOADED, {
            downloadKey: downloadFileParams.downloadKey,
          });
        }
      },
      onCancel: () => {
        if (finished) {
          return;
        }

        sender?.send(IPC_TOPICS.DOWNLOAD_API_FILE_DOWNLOADED, {
          downloadKey: downloadFileParams.downloadKey,
        });
      },
      onCompleted: () => {
        if (finished) {
          return;
        }

        sender?.send(IPC_TOPICS.DOWNLOAD_API_FILE_DOWNLOADED, {
          downloadKey: downloadFileParams.downloadKey,
        });
      },
    });
  });
};

export const DownloadApiFileFeature = {
  init,
};
