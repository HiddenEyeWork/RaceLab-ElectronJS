/*
static const int32 reasonsOut[] =
{
	IDS_REASON_OUT_NOT_OUT,
	IDS_REASON_OUT_DID_NOT_START,
	IDS_REASON_OUT_BRAKE_FAILURE,
	IDS_REASON_OUT_COOLANT_LEAK,
	IDS_REASON_OUT_RADIATOR_PROBLEM,
	IDS_REASON_OUT_ENGINE_FAILURE,
	IDS_REASON_OUT_ENGINE_HEADER,
	IDS_REASON_OUT_ENGINE_VALVE,
	IDS_REASON_OUT_ENGINE_PISTON,
	IDS_REASON_OUT_ENGINE_GEARBOX,
	IDS_REASON_OUT_ENGINE_CLUTCH,
	IDS_REASON_OUT_ENGINE_CAMSHAFT,
	IDS_REASON_OUT_ENGINE_IGNITION,
	IDS_REASON_OUT_ENGINE_FIRE,
	IDS_REASON_OUT_ENGINE_ELECTRICAL,
	IDS_REASON_OUT_FUEL_LEAK,
	IDS_REASON_OUT_FUEL_INJECTOR,
	IDS_REASON_OUT_FUEL_PUMP,
	IDS_REASON_OUT_FUEL_LINE,
	IDS_REASON_OUT_OIL_LEAK,
	IDS_REASON_OUT_OIL_LINE,
	IDS_REASON_OUT_OIL_PUMP,
	IDS_REAONS_OUT_OIL_PRESSURE,
	IDS_REASON_OUT_SUSPENSION_FAILURE,
	IDS_REASON_OUT_TIRE_PUNCTURE,
	IDS_REASON_OUT_TIRE_PROBLEM,
	IDS_REASON_OUT_WHEEL_PROBLEM,
	IDS_REASON_OUT_ACCIDENT,
	IDS_RETIRED,
	IDS_DISQUALIFIED,
	IDS_REASON_OUT_NO_FUEL,
	IDS_REASON_OUT_BRAKE_LINE,
	IDS_REASON_OUT_LOST_CONNECTION,
	IDS_REASON_OUT_EJECTED,
};
*/

declare module "node-irsdk";

declare module iRacingTypes {
  enum ReasonOutIdEnum {
    IDS_REASON_OUT_NOT_OUT = 0,
    IDS_REASON_OUT_DID_NOT_START = 1,
    IDS_REASON_OUT_BRAKE_FAILURE = 2,
    IDS_REASON_OUT_COOLANT_LEAK = 3,
    IDS_REASON_OUT_RADIATOR_PROBLEM = 4,
    IDS_REASON_OUT_ENGINE_FAILURE = 5,
    IDS_REASON_OUT_ENGINE_HEADER = 6,
    IDS_REASON_OUT_ENGINE_VALVE = 7,
    IDS_REASON_OUT_ENGINE_PISTON = 8,
    IDS_REASON_OUT_ENGINE_GEARBOX = 9,
    IDS_REASON_OUT_ENGINE_CLUTCH = 10,
    IDS_REASON_OUT_ENGINE_CAMSHAFT = 11,
    IDS_REASON_OUT_ENGINE_IGNITION = 12,
    IDS_REASON_OUT_ENGINE_FIRE = 13,
    IDS_REASON_OUT_ENGINE_ELECTRICAL = 14,
    IDS_REASON_OUT_FUEL_LEAK = 15,
    IDS_REASON_OUT_FUEL_INJECTOR = 16,
    IDS_REASON_OUT_FUEL_PUMP = 17,
    IDS_REASON_OUT_FUEL_LINE = 18,
    IDS_REASON_OUT_OIL_LEAK = 19,
    IDS_REASON_OUT_OIL_LINE = 20,
    IDS_REASON_OUT_OIL_PUMP = 21,
    IDS_REAONS_OUT_OIL_PRESSURE = 22,
    IDS_REASON_OUT_SUSPENSION_FAILURE = 23,
    IDS_REASON_OUT_TIRE_PUNCTURE = 24,
    IDS_REASON_OUT_TIRE_PROBLEM = 25,
    IDS_REASON_OUT_WHEEL_PROBLEM = 26,
    IDS_REASON_OUT_ACCIDENT = 27,
    IDS_RETIRED = 28,
    IDS_DISQUALIFIED = 29,
    IDS_REASON_OUT_NO_FUEL = 30,
    IDS_REASON_OUT_BRAKE_LINE = 31,
    IDS_REASON_OUT_LOST_CONNECTION = 32,
    IDS_REASON_OUT_EJECTED = 33,
  }
  interface WeekendOptions {
    NumStarters: number;
    StartingGrid: string;
    QualifyScoring: string;
    CourseCautions: string;
    StandingStart: number;
    Restarts: string;
    WeatherType: string;
    Skies: string;
    WindDirection: string;
    WindSpeed: string;
    WeatherTemp: string;
    RelativeHumidity: string;
    FogLevel: string;
    TimeOfDay: string;
    Date: string;
    EarthRotationSpeedupFactor: number;
    Unofficial: number;
    CommercialMode: string;
    NightMode: string;
    IsFixedSetup: number;
    StrictLapsChecking: string;
    HasOpenRegistration: number;
    HardcoreLevel: number;
    NumJokerLaps: number;
    IncidentLimit: any;
  }

  interface TelemetryOptions {
    TelemetryDiskFile: string;
  }

  interface WeekendInfo {
    TrackName: string;
    TrackID: number;
    TrackLength: string;
    TrackDisplayName: string;
    TrackDisplayShortName: string;
    TrackConfigName?: any;
    TrackCity: string;
    TrackCountry: string;
    TrackAltitude: string;
    TrackLatitude: string;
    TrackLongitude: string;
    TrackNorthOffset: string;
    TrackNumTurns: number;
    TrackPitSpeedLimit: string;
    TrackType: string;
    TrackDirection: string;
    TrackWeatherType: string;
    TrackSkies: string;
    TrackSurfaceTemp: string;
    TrackAirTemp: string;
    TrackAirPressure: string;
    TrackWindVel: string;
    TrackWindDir: string;
    TrackRelativeHumidity: string;
    TrackFogLevel: string;
    TrackCleanup: number;
    TrackDynamicTrack: number;
    SeriesID: number;
    SeasonID: number;
    SessionID: number;
    SubSessionID: number;
    LeagueID: number;
    Official: number;
    RaceWeek: number;
    EventType: string;
    Category: string;
    SimMode: string;
    TeamRacing: number;
    MinDrivers: number;
    MaxDrivers: number;
    DCRuleSet: string;
    QualifierMustStartRace: number;
    NumCarClasses: number;
    NumCarTypes: number;
    HeatRacing: number;
    WeekendOptions: WeekendOptions;
    TelemetryOptions: TelemetryOptions;
  }

  interface ResultsPosition {
    Position: number;
    ClassPosition: number;
    CarIdx: number;
    Lap: number;
    Time: number;
    FastestLap: number;
    FastestTime: number;
    LastTime: number;
    LapsLed: number;
    LapsComplete: number;
    JokerLapsComplete: number;
    LapsDriven: number;
    Incidents: number;
    ReasonOutId: ReasonOutIdEnum;
    ReasonOutStr: string;
  }

  interface ResultsFastestLap {
    CarIdx: number;
    FastestLap: number;
    FastestTime: number;
  }

  //SessionType in the definition type does not work in sense of using it int he code. So we have to re-declare it here.
  export enum iRacingSessionType {
    Invalid = "Invalid",
    OfflineTesting = "Offline Testing",
    LonePractice = "Lone Practice",
    Practice = "Practice",
    LoneQualify = "Lone Qualify",
    OpenQualify = "Open Qualify",
    Race = "Race",
    Warmup = "Warmup", //this is the case when you are in a lobby
  }

  enum iRacingTrackWetnessEnum {
    UNKNOWN = 0,
    DRY = 1,
    MOSTLY_DRY = 2,
    VERY_LIGHTLY_WET = 3,
    LIGHTLY_WET = 4,
    MODERATELY_WET = 5,
    VERY_WET = 6,
    EXTREMELY_WET = 7,
  }

  // enum SessionType {
  //   Invalid = "Invalid",
  //   OfflineTesting = "Offline Testing",
  //   LonePractice = "Lone Practice",
  //   Practice = "Practice",
  //   LoneQualify = "Lone Qualify",
  //   OpenQualify = "Open Qualify",
  //   Race = "Race",
  // }

  interface Session {
    SessionNum: number;
    SessionLaps: any;
    SessionTime: string;
    SessionNumLapsToAvg: number;
    SessionType: iRacingSessionType;
    SessionTrackRubberState: string;
    SessionName: string;
    SessionSubType?: any;
    SessionSkipped: number;
    SessionRunGroupsUsed: number;
    ResultsPositions: ResultsPosition[];
    ResultsFastestLap: ResultsFastestLap[];
    ResultsAverageLapTime: number;
    ResultsNumCautionFlags: number;
    ResultsNumCautionLaps: number;
    ResultsNumLeadChanges: number;
    ResultsLapsComplete: number;
    ResultsOfficial: number;
  }

  interface SessionInfo {
    Sessions: Session[];
  }

  interface Result {
    Position: number;
    ClassPosition: number;
    CarIdx: number;
    FastestLap: number;
    FastestTime: number;
  }

  interface QualifyResultsInfo {
    Results: Result[];
  }

  interface Camera {
    CameraNum: number;
    CameraName: string;
  }

  interface Group {
    GroupNum: number;
    GroupName: string;
    Cameras: Camera[];
    IsScenic?: boolean;
  }

  interface CameraInfo {
    Groups: Group[];
  }

  interface Frequency {
    FrequencyNum: number;
    FrequencyName: string;
    Priority: number;
    CarIdx: number;
    EntryIdx: number;
    ClubID: number;
    CanScan: number;
    CanSquawk: number;
    Muted: number;
    IsMutable: number;
    IsDeletable: number;
  }

  interface Radio {
    RadioNum: number;
    HopCount: number;
    NumFrequencies: number;
    TunedToFrequencyNum: number;
    ScanningIsOn: number;
    Frequencies: Frequency[];
  }

  interface RadioInfo {
    SelectedRadioNum: number;
    Radios: Radio[];
  }

  interface Driver {
    CarIdx: number;
    UserName: string;
    AbbrevName: string;
    Initials: string;
    UserID: number;
    TeamID: number;
    TeamName: string;
    CarNumber: string;
    CarNumberRaw: number;
    CarPath: string;
    CarClassID: number;
    CarID: number;
    CarIsPaceCar: number;
    CarIsAI: number;
    CarScreenName: string;
    CarScreenNameShort: string;
    CarClassShortName: string;
    CarClassRelSpeed: number;
    CarClassLicenseLevel: number;
    CarClassMaxFuelPct: string;
    CarClassWeightPenalty: string;
    CarClassColor: number;
    CarClassEstLapTime: number;
    IRating: number;
    LicLevel: number;
    LicSubLevel: number;
    LicString: string;
    LicColor: number;
    IsSpectator: number;
    CarDesignStr: string;
    HelmetDesignStr: string;
    SuitDesignStr: string;
    CarNumberDesignStr: string;
    CarSponsor_1: number;
    CarSponsor_2: number;
    ClubName: string;
    DivisionName: string;
    CurDriverIncidentCount: number;
    TeamIncidentCount: number;
  }

  interface DriverInfo {
    DriverCarIdx: number;
    DriverUserID: number;
    PaceCarIdx: number;
    DriverHeadPosX: number;
    DriverHeadPosY: number;
    DriverHeadPosZ: number;
    DriverCarIsElectric: number;
    DriverCarIdleRPM: number;
    DriverCarRedLine: number;
    DriverCarFuelMaxKWh: number;
    DriverCarEngCylinderCount: number;
    DriverCarFuelKgPerLtr: number;
    DriverCarFuelMaxLtr: number;
    DriverCarMaxFuelPct: number;
    DriverCarSLFirstRPM: number;
    DriverCarSLShiftRPM: number;
    DriverCarSLLastRPM: number;
    DriverCarSLBlinkRPM: number;
    DriverPitTrkPct: number;
    DriverCarEstLapTime: number;
    DriverSetupName: string;
    DriverSetupIsModified: number;
    DriverSetupLoadTypeName: string;
    DriverSetupPassedTech: number;
    DriverIncidentCount: number;
    Drivers?: Driver[];
  }

  interface Sector {
    SectorNum: number;
    SectorStartPct: number;
  }

  interface SplitTimeInfo {
    Sectors: Sector[];
  }

  interface LeftFront {
    StartingPressure: string;
    LastHotPressure: string;
    LastTempsOMI: string;
    TreadRemaining: string;
  }

  interface LeftRear {
    StartingPressure: string;
    LastHotPressure: string;
    LastTempsOMI: string;
    TreadRemaining: string;
  }

  interface RightFront {
    StartingPressure: string;
    LastHotPressure: string;
    LastTempsIMO: string;
    TreadRemaining: string;
  }

  interface RightRear {
    StartingPressure: string;
    LastHotPressure: string;
    LastTempsIMO: string;
    TreadRemaining: string;
  }

  interface Tires {
    LeftFront: LeftFront;
    LeftRear: LeftRear;
    RightFront: RightFront;
    RightRear: RightRear;
  }

  interface Front {
    ArbBlades: number;
    ToeIn: string;
    BrakePads: string;
    CrossWeight: string;
  }

  interface LeftFront2 {
    CornerWeight: string;
    RideHeight: string;
    SpringPerchOffset: string;
    SpringSet: string;
    SpringRate: string;
    BumpRubbers: string;
    LsCompDamping: string;
    HsCompDamping: string;
    LsRbdDamping: string;
    HsRbdDamping: string;
    Camber: string;
    Caster: string;
  }

  interface LeftRear2 {
    CornerWeight: string;
    RideHeight: string;
    SpringPerchOffset: string;
    SpringSet: string;
    SpringRate: string;
    BumpRubbers: string;
    LsCompDamping: string;
    HsCompDamping: string;
    LsRbdDamping: string;
    HsRbdDamping: string;
    Camber: string;
  }

  interface InCarDials {
    BrakePressureBias: string;
    AbsSwitch: string;
    AbsSetting: string;
    TractionControlSwitch: string;
    TractionControlSetting: string;
    EngineMapSetting: string;
  }

  interface RightFront2 {
    CornerWeight: string;
    RideHeight: string;
    SpringPerchOffset: string;
    SpringSet: string;
    SpringRate: string;
    BumpRubbers: string;
    LsCompDamping: string;
    HsCompDamping: string;
    LsRbdDamping: string;
    HsRbdDamping: string;
    Camber: string;
    Caster: string;
  }

  interface RightRear2 {
    CornerWeight: string;
    RideHeight: string;
    SpringPerchOffset: string;
    SpringSet: string;
    SpringRate: string;
    BumpRubbers: string;
    LsCompDamping: string;
    HsCompDamping: string;
    LsRbdDamping: string;
    HsRbdDamping: string;
    Camber: string;
  }

  interface Rear {
    FuelLevel: string;
    ArbBlades: string;
    ToeIn: string;
    DiffPreload: string;
    WingAngle: string;
  }

  interface Chassis {
    Front: Front;
    LeftFront: LeftFront2;
    LeftRear: LeftRear2;
    InCarDials: InCarDials;
    RightFront: RightFront2;
    RightRear: RightRear2;
    Rear: Rear;
  }

  interface CarSetup {
    UpdateCount: number;
    Tires: Tires;
    Chassis: Chassis;
  }

  interface SessionData {
    WeekendInfo: WeekendInfo;
    SessionInfo: SessionInfo;
    QualifyResultsInfo?: QualifyResultsInfo;
    CameraInfo: CameraInfo;
    RadioInfo: RadioInfo;
    DriverInfo: DriverInfo;
    SplitTimeInfo: SplitTimeInfo;
    CarSetup: CarSetup;
  }

  interface SessionInfoResponse {
    timestamp: string;
    data: SessionData;
  }

  enum DisplayUnit {
    Imperial = 0,
    Metric = 1,
  }

  interface TelemetryResponseData {
    SessionTime: number;
    SessionTick: number;
    SessionNum: number;
    SessionState: string;
    SessionUniqueID: number;
    SessionFlags: string[];
    SessionTimeRemain: number;
    SessionLapsRemain: number;
    SessionLapsRemainEx: number;
    SessionTimeOfDay: number;
    RadioTransmitCarIdx: number;
    RadioTransmitRadioIdx: number;
    RadioTransmitFrequencyIdx: number;
    DisplayUnits: DisplayUnit;
    DriverMarker: boolean;
    PushToPass: boolean;
    ManualBoost: boolean;
    ManualNoBoost: boolean;
    IsOnTrack: boolean;
    IsReplayPlaying: boolean;
    ReplayFrameNum: number;
    ReplayFrameNumEnd: number;
    IsDiskLoggingEnabled: boolean;
    IsDiskLoggingActive: boolean;
    FrameRate: number;
    CpuUsageBG: number;
    PlayerCarPosition: number;
    PlayerCarClassPosition: number;
    PlayerTrackSurface: string;
    PlayerTrackSurfaceMaterial: string;
    PlayerCarIdx: number;
    PlayerCarTeamIncidentCount: number;
    PlayerCarMyIncidentCount: number;
    PlayerCarDriverIncidentCount: number;
    PlayerCarWeightPenalty: number;
    PlayerCarTowTime: number;
    PlayerCarInPitStall: boolean;
    PlayerCarPitSvStatus: string;
    Precipitation: number;
    CarIdxPaceFlags: number[];
    CarIdxLap: number[];
    CarIdxLapCompleted: number[];
    CarIdxLapDistPct: number[];
    CarIdxLastLapTime: number[];
    CarIdxTrackSurface: string[];
    CarIdxTrackSurfaceMaterial: string[];
    CarIdxOnPitRoad: boolean[];
    CarIdxPosition: number[];
    CarIdxClassPosition: number[];
    CarIdxClass: number[];
    CarIdxBestLapNum: number[];
    CarIdxBestLapTime: number[];
    CarIdxTireCompound: number[];
    CarIdxF2Time: number[];
    CarIdxEstTime: number[];
    OnPitRoad: boolean;
    CarIdxSteer: number[];
    CarIdxRPM: number[];
    CarIdxGear: number[];
    CarIdxP2P_Count: number[];
    CarIdxP2P_Status: boolean[];
    SteeringWheelAngle: number;
    Throttle: number;
    Brake: number;
    BrakeRaw: number;
    Clutch: number;
    ClutchRaw: number;
    Gear: number;
    RPM: number;
    Lap: number;
    LapCompleted: number;
    LapDist: number;
    LapDistPct: number;
    RaceLaps: number;
    LapBestLap: number;
    LapBestLapTime: number;
    LapLastLapTime: number;
    LapCurrentLapTime: number;
    LapLasNLapSeq: number;
    LapLastNLapTime: number;
    LapBestNLapLap: number;
    LapBestNLapTime: number;
    LapDeltaToBestLap: number;
    LapDeltaToBestLap_DD: number;
    LapDeltaToBestLap_OK: boolean;
    LapDeltaToOptimalLap: number;
    LapDeltaToOptimalLap_DD: number;
    LapDeltaToOptimalLap_OK: boolean;
    LapDeltaToSessionBestLap: number;
    LapDeltaToSessionBestLap_DD: number;
    LapDeltaToSessionBestLap_OK: boolean;
    LapDeltaToSessionOptimalLap: number;
    LapDeltaToSessionOptimalLap_DD: number;
    LapDeltaToSessionOptimalLap_OK: boolean;
    LapDeltaToSessionLastlLap: number;
    LapDeltaToSessionLastlLap_DD: number;
    LapDeltaToSessionLastlLap_OK: boolean;
    Speed: number;
    Yaw: number;
    YawNorth: number;
    Pitch: number;
    Roll: number;
    EnterExitReset: number;
    TrackTemp: number;
    TrackTempCrew: number;
    AirTemp: number;
    TrackWetness: iRacingTrackWetnessEnum;
    WeatherDeclaredWet: boolean;
    WeatherType: number;
    Skies: number;
    AirDensity: number;
    AirPressure: number;
    WindVel: number;
    WindDir: number;
    RelativeHumidity: number;
    FogLevel: number;
    DCLapStatus: number;
    DCDriversSoFar: number;
    OkToReloadTextures: boolean;
    LoadNumTextures: boolean;
    CarLeftRight: number;
    PitsOpen: boolean;
    PitRepairLeft: number;
    PitOptRepairLeft: number;
    CamCarIdx: number;
    CamCameraNumber: number;
    CamGroupNumber: number;
    CamCameraState: string[];
    IsOnTrackCar: boolean;
    IsInGarage: boolean;
    SteeringWheelPctTorque: number;
    SteeringWheelPctTorqueSign: number;
    SteeringWheelPctTorqueSignStops: number;
    SteeringWheelPctDamper: number;
    SteeringWheelAngleMax: number;
    ShiftIndicatorPct: number;
    ShiftPowerPct: number;
    ShiftGrindRPM: number;
    ThrottleRaw: number;
    BrakeRaw: number;
    BrakeABSactive: boolean;
    HandbrakeRaw: number;
    SteeringWheelPeakForceNm: number;
    EngineWarnings: any[];
    FuelLevel: number;
    FuelLevelPct: number;
    PitSvFlags: any[];
    PitSvLFP: number;
    PitSvRFP: number;
    PitSvLRP: number;
    PitSvRRP: number;
    PitSvFuel: number;
    ReplayPlaySpeed: number;
    ReplayPlaySlowMotion: boolean;
    ReplaySessionTime: number;
    ReplaySessionNum: number;
    TireLF_RumblePitch: number;
    TireRF_RumblePitch: number;
    TireLR_RumblePitch: number;
    TireRR_RumblePitch: number;
    SteeringWheelTorque_ST: number[];
    SteeringWheelTorque: number;
    VelocityZ_ST: number[];
    VelocityY_ST: number[];
    VelocityX_ST: number[];
    VelocityZ: number;
    VelocityY: number;
    VelocityX: number;
    YawRate_ST: number[];
    PitchRate_ST: number[];
    RollRate_ST: number[];
    YawRate: number;
    PitchRate: number;
    RollRate: number;
    VertAccel_ST: number[];
    LatAccel_ST: number[];
    LongAccel_ST: number[];
    VertAccel: number;
    LatAccel: number;
    LongAccel: number;
    dcStarter: boolean;
    dcPitSpeedLimiterToggle: boolean;
    dcTractionControlToggle: boolean;
    dcHeadlightFlash: boolean;
    dpTireChange: number;
    dpRFTireChange: number;
    dpLFTireChange: number;
    dpRRTireChange: number;
    dpLRTireChange: number;
    dpFuelFill: number;
    dpWindshieldTearoff: number;
    dpFuelAddKg: number;
    dpFastRepair: number;
    dcBrakeBias: number;
    dpLFTireColdPress: number;
    dpRFTireColdPress: number;
    dpLRTireColdPress: number;
    dpRRTireColdPress: number;
    dcTractionControl: number;
    dcTractionControl2: number;
    dcABSToggle: boolean;
    dcABS: number;
    dcThrottleShape: number;
    dcFuelMixture: number;
    dcWeightJackerRight: number;
    dcDashPage: number;
    dcDiffEntry: number;
    dcDiffMiddle: number;
    dcDiffExit: number;
    dcMGUKDeployMode: number;
    dpChargeAddKWh: number;
    WaterTemp: number;
    WaterLevel: number;
    FuelPress: number;
    FuelUsePerHour: number;
    OilTemp: number;
    OilPress: number;
    OilLevel: number;
    Voltage: number;
    ManifoldPress: number;
    RFbrakeLinePress: number;
    RFcoldPressure: number;
    RFtempCL: number;
    RFtempCM: number;
    RFtempCR: number;
    RFwearL: number;
    RFwearM: number;
    RFwearR: number;
    LFbrakeLinePress: number;
    LFcoldPressure: number;
    LFtempCL: number;
    LFtempCM: number;
    LFtempCR: number;
    LFwearL: number;
    LFwearM: number;
    LFwearR: number;
    RRbrakeLinePress: number;
    RRcoldPressure: number;
    RRtempCL: number;
    RRtempCM: number;
    RRtempCR: number;
    RRwearL: number;
    RRwearM: number;
    RRwearR: number;
    LRbrakeLinePress: number;
    LRcoldPressure: number;
    LRtempCL: number;
    LRtempCM: number;
    LRtempCR: number;
    LRwearL: number;
    LRwearM: number;
    LRwearR: number;
    RRshockDefl: number;
    RRshockDefl_ST: number[];
    RRshockVel: number;
    RRshockVel_ST: number[];
    LRshockDefl: number;
    LRshockDefl_ST: number[];
    LRshockVel: number;
    LRshockVel_ST: number[];
    RFshockDefl: number;
    RFshockDefl_ST: number[];
    RFshockVel: number;
    RFshockVel_ST: number[];
    LFshockDefl: number;
    LFshockDefl_ST: number[];
    LFshockVel: number;
    LFshockVel_ST: number[];

    EnergyERSBatteryPct: number;
    EnergyMGU_KLapDeployPct: number;

    // undefined | 0 - not active/not available | 1 - available soon | 2 - available | 3 - active
    DRS_Status: number | undefined;
    dcAntiRollFront: number;
    dcAntiRollRear: number;
  }

  interface TelemetryResponse {
    timestamp: string;
    values: TelemetryResponseData;
  }
}
