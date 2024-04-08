import { ipcMain } from "electron";

import { IPCCommunicator } from "../renderer/shared/events/IPCCommunicator";

export const MainEvents = IPCCommunicator(ipcMain);
