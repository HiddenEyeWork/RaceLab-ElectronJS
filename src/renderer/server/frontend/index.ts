import { EnvironmentHelper } from "../../../renderer/shared/helpers/EnvironmentHelper";
import { ipcRenderer } from "electron";
import express from "express";
import { join } from "path";
import request from "request";

export const frontendRouter = express.Router();

const URLOrigin = "ui";
// declare var OVERLAY_HOST_WINDOW_WEBPACK_ENTRY: string;
const wpEntry = ipcRenderer.sendSync("get-overlayhost-path");

if (EnvironmentHelper.isDevelopment()) {
  console.log("overlayhost works");
  // when on development just proxy to the webpack dev server output:
  const wpURL = wpEntry.substring(0, wpEntry.lastIndexOf("/"));

  frontendRouter.use(`/${URLOrigin}`, (req: any, res: any) => {
    request(wpEntry).pipe(res);
  });

  frontendRouter.use(`/`, (req: any, res: any) => {
    request(wpURL + req.originalUrl).pipe(res);
  });
} else {
  // when on production, we serve static files from the disk
  let clientPath = join(wpEntry.replace("file://", ""), `../`);
  clientPath = clientPath.substr(0, clientPath.length - 1);
  let windowName = clientPath.substring(clientPath.lastIndexOf("\\") + 1);

  frontendRouter.use("/assets", express.static(join(clientPath, "../assets")));
  frontendRouter.use(`/${windowName}`, express.static(clientPath));
  frontendRouter.use(`/${URLOrigin}`, express.static(clientPath));
}
