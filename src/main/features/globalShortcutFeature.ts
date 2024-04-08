import { BrowserWindow, globalShortcut } from "electron";
import { IPC_TOPICS } from "../renderer/shared/enums/RendererEventsEnum";
import { ISystemSettings } from "../renderer/shared/store/IStore";

export interface IGlobalShortCutFeature {
  register: () => void;
}

export const GlobalShortCutFeature = (
  targetEventWindow: BrowserWindow | null,
  systemSettings: ISystemSettings
): IGlobalShortCutFeature => {
  const register = () => {
    if (
      !systemSettings?.KeyAndButtonBindings ||
      !systemSettings?.KeyAndButtonBindings?.KeyBindings
    ) {
      // systemSettings.KeyAndButtonBindings = DEFAULT_SYSTEM_SETTINGS.KeyAndButtonBindings;
    }

    //key: KeyBindingsEnum
    Object.keys(systemSettings.KeyAndButtonBindings.KeyBindings).map(
      (aKeyBinding: string) => {
        try {
          globalShortcut.register(
            systemSettings.KeyAndButtonBindings.KeyBindings[aKeyBinding].key,
            () => {
              if (!targetEventWindow) {
                return;
              }

              targetEventWindow.webContents.send(
                IPC_TOPICS.GLOBAL_SHORTCUT_PRESSED,
                aKeyBinding
              );
            }
          );
        } catch (ex) {
          console.error("Could not register shortcut", ex);
        }
      }
    );
  };

  return {
    register,
  };
};
