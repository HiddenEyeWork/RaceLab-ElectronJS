import { DownloadProgress, UpdateInfo } from "../../consts";
import { IpcMain, IpcMainEvent, IpcRenderer, IpcRendererEvent } from "electron";
import {
  IDownloadApiFileParams,
  IDownloadedApiFileParams,
} from "~/cockpit/features/IDownloadedApiFileParams";
import { ShowItemsInFolderEventParams } from "~/cockpit/features/IShowItemsInFolderEventParams";
import { IPC_TOPICS } from "../enums/RendererEventsEnum";

interface IRendererToRendererEvent<T = {}> {
  on: (
    callback: (args?: T, event?: IpcRendererEvent | IpcMainEvent) => void
  ) => () => void;
  emit: (args?: T) => void;
}

export const IPCCommunicator = (eventEmitter: IpcRenderer | IpcMain) => {
  const sendAndReceiveEventFn = <T>(
    eventName: IPC_TOPICS
  ): IRendererToRendererEvent<T> => {
    return {
      emit: (args) => {
        console.debug("========================> emitted", eventName, args);

        if ("send" in eventEmitter) {
          eventEmitter.send(eventName, args);
        } else {
          // this is the ipcMain event emitter. We cannot send arguments apparently because they simply not going to be serialized.
          // so we have to throw an error here when that happens.
          if (args) {
            throw new Error(
              "ipcMain event emitter cannot pass arguemnt with its events. Try to use the 'sender' agrument in the listener to reply to a message with arguments."
            );
          }
          return eventEmitter.emit(eventName, args);
        }
      },
      on: (callback) => {
        const handler = (event?: IpcRendererEvent | IpcMainEvent, args?: T) => {
          console.debug("========================> received", eventName, args);

          callback(args, event);
        };

        eventEmitter.on(eventName, handler);

        return () => {
          console.debug(
            "========================> listener removed",
            eventName
          );
          eventEmitter.removeListener(eventName, handler);
        };
      },
    };
  };

  const clearFuelConsumptionCache = sendAndReceiveEventFn(
    IPC_TOPICS.CLEAR_FUEL_CONSUMPTION_CACHE
  );
  const fuelSharingTokenChanged = sendAndReceiveEventFn<string>(
    IPC_TOPICS.FUEL_SHARING_TOKEN_CHANGED
  );
  const clearCache = sendAndReceiveEventFn(IPC_TOPICS.CLEAR_CACHE);
  const reloadUserSettings = sendAndReceiveEventFn(
    IPC_TOPICS.RELOAD_USER_SETTINGS
  );
  const reloadDriverStats = sendAndReceiveEventFn(
    IPC_TOPICS.RELOAD_DRIVER_STATS
  );
  const nodeServerNotInitialized = sendAndReceiveEventFn(
    IPC_TOPICS.NODE_SERVER_NOT_INITIALIZED
  );
  const resetChatRaceScores = sendAndReceiveEventFn(
    IPC_TOPICS.RESET_CHAT_RACE_SCORES
  );
  const cockpitWindowIsReady = sendAndReceiveEventFn(
    IPC_TOPICS.COCKPIT_WINDOW_IS_READY
  );
  const serverWindowIsReady = sendAndReceiveEventFn(
    IPC_TOPICS.SERVER_WINDOW_IS_READY
  );
  const allRendererWindowsAreReady = sendAndReceiveEventFn(
    IPC_TOPICS.ALL_RENDERER_WINDOWS_ARE_READY
  );

  const checkForUpdatePending = sendAndReceiveEventFn(
    IPC_TOPICS.CHECK_FOR_UPDATE_PENDING
  );
  const checkForUpdateSuccess = sendAndReceiveEventFn<UpdateInfo>(
    IPC_TOPICS.CHECK_FOR_UPDATE_SUCCESS
  );
  const checkForUpdateFailure = sendAndReceiveEventFn(
    IPC_TOPICS.CHECK_FOR_UPDATE_FAILURE
  );
  const downloadUpdatePending = sendAndReceiveEventFn(
    IPC_TOPICS.DOWNLOAD_UPDATE_PENDING
  );
  const downloadProgress = sendAndReceiveEventFn<DownloadProgress>(
    IPC_TOPICS.DOWNLOAD_PROGRESS
  );
  const triggerDownloadManually = sendAndReceiveEventFn(
    IPC_TOPICS.TRIGGER_DOWNLOAD_MANUALLY
  );
  const triggerUpdateNow = sendAndReceiveEventFn(IPC_TOPICS.TRIGGER_UPDATE_NOW);
  const driverTagsUpdated = sendAndReceiveEventFn(
    IPC_TOPICS.DRIVER_TAGS_UPDATED_EVENT
  );
  const signInRequired = sendAndReceiveEventFn(
    IPC_TOPICS.SIGN_IN_REQUIRED_EVENT
  );
  const authenticatedEvent = sendAndReceiveEventFn(
    IPC_TOPICS.AUTHENTICATED_EVENT
  );
  const newAccessTokenEvent = sendAndReceiveEventFn<string>(
    IPC_TOPICS.NEW_ACCESS_TOKEN_EVENT
  );
  const userLoggedOutEvent = sendAndReceiveEventFn(
    IPC_TOPICS.USER_LOGGED_OUT_EVENT
  );
  const sessionDriverListingRequest = sendAndReceiveEventFn(
    IPC_TOPICS.SESSION_DRIVER_LISTING_REQUEST_EVENT
  );
  const statBotSettingsUpdatedEvent = sendAndReceiveEventFn(
    IPC_TOPICS.STAT_BOT_SETTINGS_UPDATED_EVENT
  );
  const startRecordingLiveTelemetryData = sendAndReceiveEventFn(
    IPC_TOPICS.START_RECORDING_LIVE_TELEMETRY_DATA
  );
  const stopRecordingLiveTelemetryData = sendAndReceiveEventFn(
    IPC_TOPICS.STOP_RECORDING_LIVE_TELEMETRY_DATA
  );
  const activeLayoutIdChanged = sendAndReceiveEventFn<string | null>(
    IPC_TOPICS.ACTIVE_LAYOUT_ID_CHANGED
  );
  const toggleVrMode = sendAndReceiveEventFn(IPC_TOPICS.TOGGLE_VR_MODE);
  const resetVrConfiguration = sendAndReceiveEventFn(
    IPC_TOPICS.RESET_VR_CONFIGURATION
  );
  const toggleOverlayLockedMode = sendAndReceiveEventFn<boolean>(
    IPC_TOPICS.TOGGLE_OVERLAY_LOCKED_MODE
  );
  const toggleOverlayVisibility = sendAndReceiveEventFn(
    IPC_TOPICS.TOGGLE_OVERLAY_VISIBILITY
  );
  const cycleDeltaBarComparisonMode = sendAndReceiveEventFn(
    IPC_TOPICS.CYCLE_DELTA_BAR_COMPARISON_MODE
  );
  const toggleStandingsRaceBriefing = sendAndReceiveEventFn(
    IPC_TOPICS.TOGGLE_STANDINGS_RACE_BRIEFING
  );
  const autoLaunchAppSettingChanged = sendAndReceiveEventFn<boolean>(
    IPC_TOPICS.AUTO_LAUNCH_APPLICATION_SETTING_CHANGED
  );
  const switchHostEnvironment = sendAndReceiveEventFn<string>(
    IPC_TOPICS.SWITCH_HOST_ENVIRONMENT
  );
  const vrStatusChanged = sendAndReceiveEventFn<boolean>(
    IPC_TOPICS.VR_STATUS_CHANGED
  );
  const showItemInFolder = sendAndReceiveEventFn<ShowItemsInFolderEventParams>(
    IPC_TOPICS.SHOW_ITEM_IN_FOLDER
  );
  const downloadApiFileRequest = sendAndReceiveEventFn<IDownloadApiFileParams>(
    IPC_TOPICS.DOWNLOAD_API_FILE_REQUEST
  );
  const downloadedApiFile = sendAndReceiveEventFn<IDownloadedApiFileParams>(
    IPC_TOPICS.DOWNLOAD_API_FILE_DOWNLOADED
  );
  const changeToLoginScreenSize = sendAndReceiveEventFn(
    IPC_TOPICS.CHANGE_TO_LOGIN_SCREEN_SIZE
  );
  const changeToAuthenticatedScreenSize = sendAndReceiveEventFn(
    IPC_TOPICS.CHANGE_TO_AUTHENTICATED_SCREEN_SIZE
  );
  const bringAppToFocus = sendAndReceiveEventFn(IPC_TOPICS.BRING_APP_TO_FOCUS);
  const closeApplication = sendAndReceiveEventFn(IPC_TOPICS.CLOSE_APPLICATION);

  const closeOverlayWindow = sendAndReceiveEventFn<string>(
    IPC_TOPICS.CLOSE_OVERLAY_WINDOW
  );
  const isOverlayWindowOpenRequest = sendAndReceiveEventFn<string>(
    IPC_TOPICS.IS_OVERLAY_WINDOW_OPEN_REQUEST
  );
  const overlayWindowOpenEvent = sendAndReceiveEventFn<string>(
    IPC_TOPICS.OVERLAY_WINDOW_OPEN_EVENT
  );
  const overlayWindowCloseEvent = sendAndReceiveEventFn<string>(
    IPC_TOPICS.OVERLAY_WINDOW_CLOSE_EVENT
  );
  const pulsoidAccountConnected = sendAndReceiveEventFn(
    IPC_TOPICS.PULSOID_ACCOUNT_CONNECTED
  );
  const giftedSubscriptionSuccess = sendAndReceiveEventFn(
    IPC_TOPICS.GIFTED_SUBSCRIPTION_SUCCESS
  );
  const giftedSubscriptionCancelled = sendAndReceiveEventFn(
    IPC_TOPICS.GIFTED_SUBSCRIPTION_CANCELLED
  );

  return {
    clearFuelConsumptionCache,
    fuelSharingTokenChanged,
    clearCache,
    reloadUserSettings,
    reloadDriverStats,
    nodeServerNotInitialized,
    resetChatRaceScores,
    cockpitWindowIsReady,
    serverWindowIsReady,
    allRendererWindowsAreReady,
    checkForUpdatePending,
    checkForUpdateSuccess,
    checkForUpdateFailure,
    downloadUpdatePending,
    downloadProgress,
    triggerDownloadManually,
    triggerUpdateNow,
    driverTagsUpdated,
    signInRequired,
    authenticatedEvent,
    newAccessTokenEvent,
    userLoggedOutEvent,
    sessionDriverListingRequest,

    statBotSettingsUpdatedEvent,
    startRecordingLiveTelemetryData,
    stopRecordingLiveTelemetryData,
    activeLayoutIdChanged,
    toggleVrMode,
    resetVrConfiguration,
    toggleOverlayLockedMode,
    toggleOverlayVisibility,
    cycleDeltaBarComparisonMode,
    toggleStandingsRaceBriefing,
    autoLaunchAppSettingChanged,
    switchHostEnvironment,
    vrStatusChanged,
    showItemInFolder,
    downloadApiFileRequest,
    downloadedApiFile,
    changeToLoginScreenSize,
    changeToAuthenticatedScreenSize,
    bringAppToFocus,
    closeApplication,
    closeOverlayWindow,
    isOverlayWindowOpenRequest,
    overlayWindowOpenEvent,
    overlayWindowCloseEvent,
    pulsoidAccountConnected,
    giftedSubscriptionSuccess,
    giftedSubscriptionCancelled,
  };
};
