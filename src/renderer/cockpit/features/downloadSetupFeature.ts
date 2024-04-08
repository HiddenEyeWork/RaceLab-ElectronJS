import { RendererEvents } from "~/cockpit/events/RendererEvents";

import { IDownloadApiFileParams } from "./IDownloadedApiFileParams";

const downloadFile = async (params: IDownloadApiFileParams) => {
  let downloadedFileRemoveListener: (() => void) | null = null;

  const p = new Promise<any>((resolve, reject) => {
    RendererEvents.downloadApiFileRequest.emit(params);
    downloadedFileRemoveListener = RendererEvents.downloadedApiFile.on((p) => {
      console.log("downloaded even received", p);

      if (p?.downloadKey == params.downloadKey) {
        resolve(null);

        if (downloadedFileRemoveListener) {
          downloadedFileRemoveListener();
        }
      }
    });
  });

  return p;
};

export const DownloadSetupFeature = {
  downloadFile,
};
