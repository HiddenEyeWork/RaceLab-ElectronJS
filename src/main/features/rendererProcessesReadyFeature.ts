import { MainEvents } from "../MainEvents";

export const rendererProcessesReadyFeature = (readyCallback: () => void) => {
  let cockpitIsReady = false;
  let serverIsReady = false;

  MainEvents.serverWindowIsReady.on(() => {
    serverIsReady = true;
    checkReadyness();
  });

  MainEvents.cockpitWindowIsReady.on(() => {
    cockpitIsReady = true;
    checkReadyness();
  });

  let removeListenersCallback: any;
  const checkReadyness = () => {
    if (cockpitIsReady && serverIsReady) {
      // removing all previously registered broadcasting listners after reloading the application with ctrl+R
      if (removeListenersCallback) {
        try {
          removeListenersCallback();
        } catch (ex) {
          //nothing to do here
        }
      }

      removeListenersCallback = readyCallback();

      console.debug("emitting all renderer windows are ready!", new Date());
      MainEvents.allRendererWindowsAreReady.emit();
    }
  };
};
