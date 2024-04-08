import { Environments } from "../renderer/shared/Environments";

export interface IStore {
  // new settings
  UserId: any;
  ShowModal: string[];
  SystemSettings: ISystemSettings;
  ApplicationSettings: IApplicationSettings;

  SeriesBrowseSettings: ISeriesBrowseSettings;
  DevelopmentSettings: IDevelopmentSettings;

  SimRacingTitles: ISimRacingTitles;
}

export interface ISimRacingTitles {
  [key: string]: ISimRacingSpecificSettings;
}

export interface ISimRacingSpecificSettings {
  ConnectionPort: number | null;
  ConnectionPassword: string | null;
  CommandPassword: string | null;
}

export interface IDevelopmentSettings {
  Environment: Environments;
}

export interface ISeriesBrowseSettings {
  NumberOfBestDriversInSeriesLapComparisonPage: number;
  FavoriteSeriesIds: number[];
  SeriesPageFilters: {
    searchTerm: string;
    searchedCarId: number | null;
    searchedRaceCategory: any;
    searchedFavorite: boolean;
  };
}

export interface IApplicationSettings {
  IsHardwareAccelerationDisabled: boolean;
  StartMinimized: boolean;
}

type ValueOf<T> = T[keyof T];

export interface IGamePadBinding {
  deviceId: string;
  buttonIndex: number;
  value: number;
}

export interface IKeyboardBinding {
  key: string;
}

export interface IKeyAndbuttonBindings {
  ButtonBindings: { [key: string]: IGamePadBinding }; // key is KeyBindingsEnum
  KeyBindings: { [key: string]: IKeyboardBinding }; // key is KeyBindingsEnum
}

export interface IStreamingSettings {
  TwitchChannelName: string;
  TwitchAccessToken: string;
}

export interface ITrackedOverlay {
  uri: string;
  windowId: string;
  windowTitle: string;
  isOpen?: boolean;
  lockedOnly?: boolean;
  bounds: any;
  autoOpen?: boolean;
  isLocked?: boolean;
}

export interface ITrackedOverlays {
  [key: string]: ITrackedOverlay;
}
export interface ISystemSettings {
  OverlayWindowPositions: any;
  DefaultZoomFactor: number;
  OpenOverlays: ITrackedOverlays;
  IsLivePositionsEnabled: boolean;
  IsTelemetryRecordingEnabled: boolean;
  StartWithWindowsEnabled: boolean;
  OverlayTitleColor: string;
  OverlaysHidden: boolean;
  KeyAndButtonBindings: IKeyAndbuttonBindings;
  Streaming: IStreamingSettings;
  ShowFirstStepsNotification: boolean;

  AppLanguage: string;
  AutoOpenVR: boolean;
  IsFuelSharingEnabled: boolean;

  /**
   * @deprecated
   */
  UseNativeSimRelatives: boolean;
}
