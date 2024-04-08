export enum IPC_TOPICS {
  // update events
  CHECK_FOR_UPDATE_PENDING = "CHECK_FOR_UPDATE_PENDING",
  CHECK_FOR_UPDATE_SUCCESS = "CHECK_FOR_UPDATE_SUCCESS",
  CHECK_FOR_UPDATE_FAILURE = "CHECK_FOR_UPDATE_FAILURE",
  DOWNLOAD_UPDATE_PENDING = "DOWNLOAD_UPDATE_PENDING",
  DOWNLOAD_PROGRESS = "DOWNLOAD_PROGRESS",
  TRIGGER_DOWNLOAD_MANUALLY = "TRIGGER_DOWNLOAD_MANUALLY",
  TRIGGER_UPDATE_NOW = "TRIGGER_UPDATE_NOW",

  //overlay window manipulations
  CREATE_OVERLAY_WINDOW = "CREATE_OVERLAY_WINDOW",
  CLOSE_OVERLAY_WINDOW = "CLOSE_OVERLAY_WINDOW",
  IS_OVERLAY_WINDOW_OPEN_REQUEST = "IS_OVERLAY_WINDOW_OPEN_REQUEST",
  OVERLAY_WINDOW_OPEN_EVENT = "OVERLAY_WINDOW_OPEN_EVENT",
  OVERLAY_WINDOW_CLOSE_EVENT = "OVERLAY_WINDOW_CLOSE_EVENT",

  // other
  COCKPIT_WINDOW_IS_READY = "COCKPIT_WINDOW_IS_READY",
  SERVER_WINDOW_IS_READY = "SERVER_WINDOW_IS_READY",
  ALL_RENDERER_WINDOWS_ARE_READY = "ALL_RENDERER_WINDOWS_ARE_READY",

  CLEAR_FUEL_CONSUMPTION_CACHE = "CLEAR_FUEL_CONSUMPTION_CACHE",
  FUEL_SHARING_TOKEN_CHANGED = "FUEL_SHARING_TOKEN_CHANGED",
  CLEAR_CACHE = "CLEAR_CACHE",
  RELOAD_USER_SETTINGS = "RELOAD_USER_SETTINGS",
  RELOAD_DRIVER_STATS = "RELOAD_DRIVER_STATS",
  USER_MEMBERSHIP_CHANGE = "USER_MEMBERSHIP_CHANGE",
  SIM_RACING_TITLE_CHANGED = "SIM_RACING_TITLE_CHANGED",
  NODE_SERVER_NOT_INITIALIZED = "NODE_SERVER_NOT_INITIALIZED",
  RESET_CHAT_RACE_SCORES = "RESET_CHAT_RACE_SCORES",
  DRIVER_TAGS_UPDATED_EVENT = "DRIVER_TAGS_UPDATED_EVENT",
  SIGN_IN_REQUIRED_EVENT = "SIGN_IN_REQUIRED_EVENT",
  AUTHENTICATED_EVENT = "AUTHENTICATED_EVENT",
  NEW_ACCESS_TOKEN_EVENT = "NEW_ACCESS_TOKEN_EVENT",
  USER_LOGGED_OUT_EVENT = "USER_LOGGED_OUT_EVENT",
  SESSION_DRIVER_LISTING_REQUEST_EVENT = "SESSION_DRIVER_LISTING_REQUEST_EVENT",
  SESSION_DRIVER_LISTING_EVENT = "SESSION_DRIVER_LISTING_EVENT",
  STAT_BOT_SETTINGS_UPDATED_EVENT = "STAT_BOT_SETTINGS_UPDATED_EVENT",
  START_RECORDING_LIVE_TELEMETRY_DATA = "START_RECORDING_LIVE_TELEMETRY_DATA",
  STOP_RECORDING_LIVE_TELEMETRY_DATA = "STOP_RECORDING_LIVE_TELEMETRY_DATA",
  ACTIVE_LAYOUT_ID_CHANGED = "ACTIVE_LAYOUT_ID_CHANGED",
  TOGGLE_VR_MODE = "TOGGLE_VR_MODE",
  RESET_VR_CONFIGURATION = "RESET_VR_CONFIGURATION",
  TOGGLE_OVERLAY_LOCKED_MODE = "TOGGLE_OVERLAY_LOCKED_MODE",
  CYCLE_DELTA_BAR_COMPARISON_MODE = "CYCLE_DELTA_BAR_COMPARISON_MODE",
  TOGGLE_OVERLAY_VISIBILITY = "TOGGLE_OVERLAY_VISIBILITY",
  TOGGLE_STANDINGS_RACE_BRIEFING = "TOGGLE_STANDINGS_RACE_BRIEFING",
  AUTO_LAUNCH_APPLICATION_SETTING_CHANGED = "AUTO_LAUNCH_APPLICATION_SETTING_CHANGED",
  SWITCH_HOST_ENVIRONMENT = "SWITCH_HOST_ENVIRONMENT",
  GLOBAL_SHORTCUT_PRESSED = "GLOBAL_SHORTCUT_PRESSED",
  VR_STATUS_CHANGED = "VR_STATUS_CHANGED",
  SHOW_ITEM_IN_FOLDER = "SHOW_ITEM_IN_FOLDER",
  DOWNLOAD_API_FILE_REQUEST = "DOWNLOAD_API_FILE_REQUEST",
  DOWNLOAD_API_FILE_DOWNLOADED = "DOWNLOAD_API_FILE_DOWNLOADED",
  CHANGE_TO_LOGIN_SCREEN_SIZE = "CHANGE_TO_LOGIN_SCREEN_SIZE",
  CHANGE_TO_AUTHENTICATED_SCREEN_SIZE = "CHANGE_TO_AUTHENTICATED_SCREEN_SIZE",
  BRING_APP_TO_FOCUS = "BRING_APP_TO_FOCUS",
  CLOSE_APPLICATION = "CLOSE_APPLICATION",
  PULSOID_ACCOUNT_CONNECTED = "PULSOID_ACCOUNT_CONNECTED",
  GIFTED_SUBSCRIPTION_SUCCESS = "GIFTED_SUBSCRIPTION_SUCCESS",
  GIFTED_SUBSCRIPTION_CANCELLED = "GIFTED_SUBSCRIPTION_CANCELLED",
}