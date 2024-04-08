import { MainEvents } from "../MainEvents";
import { BrowserWindow } from "electron";
import _ from "underscore";
import { IPC_TOPICS } from "../../renderer/shared/enums/RendererEventsEnum";
import { WindowOverlayId } from "../../renderer/shared/enums/WindowOverlayIdEnum";
import { ISystemSettings, ITrackedOverlay } from "../../renderer/shared/store/IStore";
import { nameOf } from "../../renderer/shared/utils/NameOf";

let bWindows: (BrowserWindow | null)[] = [];

export const openWindowInstances: any = {};

const createClientWindow = (options: ITrackedOverlay) => {
  const { uri, windowId, autoOpen, bounds, lockedOnly, isLocked, windowTitle } =
    options;

  const systemSettings: any = { OverlayWindowPositions: {} };
  let position = systemSettings && systemSettings.OverlayWindowPositions;

  const overlayModeUrl = `${uri}?overlayMode`;

  if (!position) {
    position = {};
  }

  if (!position[windowId]) {
    position[windowId] = { x: 0, y: 0 };
  }

  let clientWindow: BrowserWindow | null;

  // Create the browser window.
  clientWindow = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    width: 100,
    transparent: true,
    height: 100,
    title: windowTitle,
    x: position[windowId].bounds
      ? position[windowId].bounds.x
      : position[windowId].x,
    y: position[windowId].bounds
      ? position[windowId].bounds.y
      : position[windowId].y,
    fullscreenable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      contextIsolation: false,
    },
  });

  clientWindow.setAlwaysOnTop(true, "normal");

  openWindowInstances[windowId] = clientWindow;

  if (bounds) {
    setTimeout(() => {
      clientWindow && clientWindow.setBounds(bounds);
    }, 300);
  }

  MainEvents.toggleOverlayLockedMode.on((status) => {
    if (
      clientWindow &&
      !lockedOnly &&
      windowId != WindowOverlayId.LAYOUT_OVERLAY
    ) {
      setLockedState(!!status);
    }
  });

  // and load the index.html of the app.
  clientWindow.loadURL(overlayModeUrl);
  // clientWindow.setIgnoreMouseEvents(true);
  // Open the DevTools.
  // clientWindow.webContents.openDevTools();

  const saveWindowPosition = (event: any) => {
    if (!clientWindow) {
      return;
    }
  };

  const addWindowToOpenWindowsList = (isOpen: boolean) => {
    if (!clientWindow) {
      return;
    }
  };

  const setLockedState = (isLocked: boolean) => {
    if (clientWindow) {
      clientWindow.setIgnoreMouseEvents(isLocked, { forward: isLocked });
    }
  };

  const debouncedSaveWindow = _.debounce(saveWindowPosition, 1500);

  clientWindow.on("move", (event: any) => debouncedSaveWindow(event));
  clientWindow.on("enter-full-screen", (event: any) => event.preventDefault());

  // Emitted when the window is closed.
  clientWindow.on("closed", () => {
    delete openWindowInstances[windowId];
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    clientWindow = null; // tslint:disable-line: no-null-keyword

    setWindowStatusClosed(windowId);
  });

  if (clientWindow && lockedOnly) {
    setTimeout(() => {
      setLockedState(true);
    }, 300);
  } else {
    setLockedState(!!isLocked);
  }

  addWindowToOpenWindowsList(true);
  sendOpenOrCloseOverlayWindowEvent(bWindows, options.windowId);
};

const setWindowStatusClosed = (windowId: string) => {};

const closeClientWindow = (windowId: string) => {
  if (openWindowInstances && openWindowInstances[windowId]) {
    openWindowInstances[windowId].close();

    delete openWindowInstances[windowId];
  }

  setWindowStatusClosed(windowId);
};

const isOverlayWindowOpen = (windowId: string) => {
  return Object.keys(openWindowInstances).includes(windowId);
};

const sendOpenOrCloseOverlayWindowEvent = (
  browserWindows: (BrowserWindow | null)[],
  windowId: string
) => {
  const isOpen = isOverlayWindowOpen(windowId);

  //try block needed because if user closes the main application, these sending events will throw an error
  try {
    if (isOpen) {
      browserWindows.map((x) => {
        if (x?.isDestroyed()) {
          return;
        }

        x?.webContents.send(IPC_TOPICS.OVERLAY_WINDOW_OPEN_EVENT, windowId);
      });
    } else {
      browserWindows.map((x) => {
        if (x?.isDestroyed()) {
          return;
        }
        x?.webContents.send(IPC_TOPICS.OVERLAY_WINDOW_CLOSE_EVENT, windowId);
      });
    }
  } catch (ex) {
    console.error("Could not send close/open event", ex);
  }
};

export const OverlayWindowFeature = {
  init: (browserWindows: (BrowserWindow | null)[]) => {
    bWindows = browserWindows || [];

    // MainEvents.createOverlayWindow.on((options) => {
    //   if (!options) {
    //     return;
    //   }

    //   createClientWindow(options);
    // });

    MainEvents.closeOverlayWindow.on((windowId) => {
      if (!windowId) {
        return;
      }

      closeClientWindow(windowId);
    });

    MainEvents.isOverlayWindowOpenRequest.on((windowId, event) => {
      if (!windowId) {
        return;
      }

      if (isOverlayWindowOpen(windowId)) {
        event?.sender.send(IPC_TOPICS.OVERLAY_WINDOW_OPEN_EVENT, windowId);
      } else {
        event?.sender.send(IPC_TOPICS.OVERLAY_WINDOW_CLOSE_EVENT, windowId);
      }
    });
  },
};
