import { CupCategory } from "racelab-acc-node-wrapper/src/enums";

declare module AccNodeWrapperTypes {
  export interface M_GRAPHICS_RESULT {
    packetId: number;
    status: string;
    session: string;
    currentTime: string[];
    lastTime: string[];
    bestTime: string[];
    split: string[];
    completedLaps: number;
    position: number;
    iCurrentTime: number;
    iLastTime: number;
    iBestTime: number;
    sessionTimeLeft: number;
    distanceTraveled: number;
    isInPit: boolean;
    currentSectorIndex: number;
    lastSectorTime: number;
    numberOfLaps: number;
    tyreCompound: string[];
    normalizedCarPosition: number;
    activeCars: number;
    carCoordinates: number[][];
    carID: number[];
    playerCarID: number;
    penaltyTime: number;
    flag: string;
    penalty: string;
    idealLineOn: boolean;
    isInPitLane: boolean;
    surfaceGrip: number;
    mandatoryPitDone: boolean;
    windSpeed: number;
    windDirection: number;
    isSetupMenuVisible: boolean;
    mainDisplayIndex: number;
    secondaryDisplyIndex: number;
    TC: number;
    TCCUT: number;
    EngineMap: number;
    ABS: number;
    fuelXLap: number;
    rainLights: boolean;
    flashingLights: boolean;
    lightsStage: number;
    exhaustTemperature: number;
    wiperLV: number;
    driverStintTotalTimeLeft: number;
    driverStintTimeLeft: number;
    rainTyres: boolean;
    sessionIndex: number;
    usedFuel: number;
    deltaLapTime: string[];
    iDeltaLapTime: number;
    estimatedLapTime: string[];
    iEstimatedLapTime: number;
    isDeltaPositive: boolean;
    iSplit: number;
    isValidLap: boolean;
    fuelEstimatedLaps: number;
    trackStatus: string[];
    missingMandatoryPits: number;
    Clock: number;
    directionLightsLeft: boolean;
    directionLightsRight: boolean;
    GlobalYellow: boolean;
    GlobalYellow1: boolean;
    GlobalYellow2: boolean;
    GlobalYellow3: boolean;
    GlobalWhite: boolean;
    GlobalGreen: boolean;
    GlobalChequered: boolean;
    GlobalRed: boolean;
    mfdTyreSet: number;
    mfdFuelToAdd: number;
    mfdTyrePressureLF: number;
    mfdTyrePressureRF: number;
    mfdTyrePressureLR: number;
    mfdTyrePressureRR: number;
    trackGripStatus: string;
    rainIntensity: AccRainIntensity;
    rainIntensityIn10min: string;
    rainIntensityIn30min: string;
    currentTyreSet: number;
    strategyTyreSet: number;
  }

  export interface M_PHYSICS_RESULT {
    packetId: number;
    gas: number;
    brake: number;
    fuel: number;
    gear: number;
    rpms: number;
    steerAngle: number;
    speedKmh: number;
    velocity: number[];
    accG: number[];
    wheelSlip: number[];
    wheelPressure: number[];
    wheelAngularSpeed: number[];
    TyreCoreTemp: number[];
    suspensionTravel: number[];
    tc: number;
    heading: number;
    pitch: number;
    roll: number;
    carDamage: number[];
    pitLimiterOn: boolean;
    abs: number;
    autoshifterOn: boolean;
    turboBoost: number;
    airTemp: number;
    roadTemp: number;
    localAngularVel: number[];
    finalFF: number;
    kersCurrentKJ: number;
    brakeTemp: number[];
    clutch: number;
    isAIControlled: boolean;
    tyreContactPoint: number[][];
    tyreContactNormal: number[][];
    tyreContactHeading: number[][];
    brakeBias: number;
    localVelocity: number[];
    slipRatio: number[];
    slipAngle: number[];
    waterTemp: number;
    brakePressure: number[];
    frontBrakeCompound: number;
    rearBrakeCompound: number;
    padLife: number[];
    discLife: number[];
    ignitionOn: boolean;
    starterEngineOn: boolean;
    isEngineRunning: boolean;
    kerbVibration: number;
    slipVibrations: number;
    gVibrations: number;
    absVibrations: number;
  }

  export interface BestSessionLap {
    LaptimeMS: number;
    CarIndex: number;
    DriverIndex: number;
    Splits: any[];
    Type: string;
    isInvalid: boolean;
    isValidForBest: boolean;
  }

  export interface LastLap {
    LaptimeMS: number;
    CarIndex: number;
    DriverIndex: number;
    Splits: any[];
    Type: string;
    isInvalid: boolean;
    isValidForBest: boolean;
  }

  export interface CurrentLap {
    LaptimeMS: number;
    CarIndex: number;
    DriverIndex: number;
    Splits: any[];
    Type: string;
    isInvalid: boolean;
    isValidForBest: boolean;
  }

  export interface CameraSet {
    name: string;
    cameras: string[];
  }

  export interface Driver {
    FirstName: string;
    LastName: string;
    ShortName: string;
    Category: string;
    Nationality: string;
  }

  export interface EntryListCar {
    CarIndex: number;
    CarModelType: number;
    TeamName: string;
    RaceNumber: number;
    CupCategory: CupCategory;
    CurrentDriverIndex: number;
    Drivers: Driver[];
    Nationality: string;
  }

  export interface REALTIME_CAR_UPDATE {
    CarIndex: number;
    DriverIndex: number;
    DriverCount: number;
    Gear: number;
    WorldPosX: number;
    WorldPosY: number;
    Yaw: number;
    CarLocation: string;
    Kmh: number;
    Position: number;
    CupPosition: number;
    TrackPosition: number;
    SplinePosition: number;
    Laps: number;
    Delta: number;
    BestSessionLap: BestSessionLap;
    LastLap: LastLap;
    CurrentLap: CurrentLap;
  }

  export interface REALTIME_UPDATE {
    EventIndex: number;
    SessionIndex: number;
    SessionType: string;
    Phase: string;
    SessionTime: number;
    SessionEndTime: number;
    FocusedCarIndex: number;
    ActiveCameraSet: string;
    ActiveCamera: string;
    CurrentHudPage: string;
    IsReplayPlaying: boolean;
    TimeOfDay: number;
    AmbientTemp: number;
    TrackTemp: number;
    Clouds: number;
    RainLevel: number;
    Wetness: number;
    BestSessionLap: BestSessionLap;
  }

  export interface M_STATIC_RESULT {
    smVersion: string[];
    acVersion: string[];
    numberOfSessions: number;
    numCars: number;
    carModel: string[];
    track: string[];
    playerName: string[];
    playerSurname: string[];
    playerNick: string[];
    sectorCount: number;
    maxRpm: number;
    maxFuel: number;
    penaltiesEnabled: boolean;
    aidFuelRate: number;
    aidTireRate: number;
    aidMechanicalDamage: number;
    AllowTyreBlankets: boolean;
    aidStability: boolean;
    aidAutoclutch: boolean;
    aidAutoBlip: boolean;
    PitWindowStart: number;
    PitWindowEnd: number;
    isOnline: boolean;
    dryTyresName: string[];
    wetTyresName: string[];
  }

  export interface TRACK_DATA {
    connectionId: number;
    TrackName: string;
    TrackId: number;
    TrackMeters: number;
    CameraSets: CameraSet[];
    HUDPages: string[];
  }

  export interface ENTRY_LIST_CAR {
    _entryListCars: EntryListCar[];
  }
}
