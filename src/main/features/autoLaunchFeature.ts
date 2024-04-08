import packagejson from "./../../../package.json";
import AutoLaunch from "auto-launch";
import { MainEvents } from "../MainEvents";

export const AutoLaunchFeature = () => {
  var autoLauncher = new AutoLaunch({
    name: packagejson.productName,
  });

  const setAutoLaunchFeature = (isEnable: boolean) => {
    if (isEnable) {
      // Checking if autoLaunch is enabled, if not then enabling it.
      autoLauncher
        .isEnabled()
        .then(function (isEnabled: boolean) {
          if (isEnabled) return;

          autoLauncher.enable();
        })
        .catch(function (err: any) {
          throw err;
        });
    } else {
      // Checking if autoLaunch is disabled, if not then disable it.
      autoLauncher
        .isEnabled()
        .then(function (isEnabled: boolean) {
          if (!isEnabled) return;

          autoLauncher.disable();
        })
        .catch(function (err: any) {
          throw err;
        });
    }
  };

  MainEvents.autoLaunchAppSettingChanged.on((isOn) => {
    setAutoLaunchFeature(!!isOn);
  });
};
