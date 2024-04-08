import { ipcRenderer } from "electron";

import { IPCCommunicator } from "../renderer/shared/events/IPCCommunicator";

export const RendererEvents = IPCCommunicator(ipcRenderer);
