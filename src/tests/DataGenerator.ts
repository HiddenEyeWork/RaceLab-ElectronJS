import { IiRacingService } from "../renderer/server/datastream/services/iracingService/IiRacingService";

interface IDataGenerator {
  carIdxLapDistPct: (playerIdx: number, lapDistPct: number) => IDataGenerator;
  carIdxLapCompleted: (playerIdx: number, lapCompleted: number) => IDataGenerator;
  currentLap: (playerIdx: number, lapNumber: number) => IDataGenerator;
  fuelLvl: (fuelInL: number) => IDataGenerator;
  playerCarIdx: (id: number) => IDataGenerator;
  carIdxPosition: (playerIdx: number, position: number) => IDataGenerator;
  currentSession: () => IDataGenerator;
  setTimeBasedSession: (sessionTime: number, sessionTimeRemain: number, sessionIndex?: number) => IDataGenerator;
  setLapBasedSession: (sessionLaps: number, sessionLapsRemain: number, sessionIndex?: number) => IDataGenerator;
  fastestLapCarIdx: (playerIdx: number, lapTimeInSec: number, sessionIndex: number) => IDataGenerator;
  driverCarEstLapTime: (lapTimeInSec: number) => IDataGenerator;

  // events
  carReset: () => IDataGenerator;
  sessionChange: () => IDataGenerator;

  // final step
  applyMock: () => void
}

export const DataGenerator = (iRacingService: IiRacingService extends jest.Mock<IiRacingService>): IDataGenerator => {

  let telemetry:iRacing.TelemetryResponse = {
    timestamp: `${Date.now}`,
    values: {} as iRacing.TelemetryResponseData
  };

  let session:iRacing.SessionInfoResponse = {
    timestamp: `${Date.now}`,
    data: {
      WeekendInfo: {
        SubSessionID: 1
      },
      SessionInfo: {
        Sessions: []
      } as iRacing.SessionInfo
    } as iRacing.SessionData
  };

  telemetry.values.CarIdxLap = [];

  return {
    carIdxLapDistPct: function(playerIdx: number, lapDistPct: number){
      telemetry.values.CarIdxLapDistPct = telemetry.values.CarIdxLapDistPct || [];
      telemetry.values.CarIdxLapDistPct[playerIdx] = lapDistPct;

      return this;
    },

    carIdxLapCompleted: function(playerIdx: number, lapCompleted: number){
      telemetry.values.CarIdxLapCompleted = telemetry.values.CarIdxLapCompleted || [];
      telemetry.values.CarIdxLapCompleted[playerIdx] = lapCompleted;

      telemetry.values.CarIdxLap = telemetry.values.CarIdxLap || [];
      telemetry.values.CarIdxLap[playerIdx] = lapCompleted+1;

      return this;
    },

    currentLap: function(playerIdx: number, lapNumber: number){
      telemetry.values.CarIdxLap = telemetry.values.CarIdxLap || [];
      telemetry.values.CarIdxLap[playerIdx] = lapNumber;

      telemetry.values.CarIdxLapCompleted = telemetry.values.CarIdxLapCompleted || [];
      telemetry.values.CarIdxLapCompleted[playerIdx] = lapNumber-1;

      return this;
    },

    fuelLvl: function (fuelInL:number){
      telemetry.values.FuelLevel = fuelInL;

      return this;
    },

    playerCarIdx: function(id: number){
      telemetry.values.PlayerCarIdx = id;

      return this;
    },

    carIdxPosition: function(playerIdx: number, position: number){
      telemetry.values.CarIdxPosition = telemetry.values.CarIdxPosition || [];
      telemetry.values.CarIdxPosition[playerIdx] = position;

      return this;
    },

    currentSession: function(index: number = 0){
      telemetry.values.SessionNum = 0;
      session.data.SessionInfo.Sessions[0] = {

      } as iRacing.Session;
      return this;
    },

    setTimeBasedSession: function(sessionTime: number, sessionTimeRemain: number, sessionIndex: number = 0){
      telemetry.values.SessionTimeRemain = sessionTimeRemain;
      session.data.SessionInfo.Sessions[sessionIndex] = session.data.SessionInfo.Sessions[sessionIndex] || {};
      session.data.SessionInfo.Sessions[sessionIndex].SessionTime = sessionTime+" seconds";
      session.data.SessionInfo.Sessions[sessionIndex].SessionLaps = "unlimited";

      return this;
    },

    setLapBasedSession: function(sessionLaps: number, sessionLapsRemain: number, sessionIndex: number = 0){
      telemetry.values.SessionLapsRemain = sessionLapsRemain;
      telemetry.values.RaceLaps = sessionLaps - sessionLapsRemain;
      session.data.SessionInfo.Sessions[sessionIndex] = session.data.SessionInfo.Sessions[sessionIndex] || {};
      session.data.SessionInfo.Sessions[sessionIndex].SessionLaps = sessionLaps+" laps";
      session.data.SessionInfo.Sessions[sessionIndex].SessionTime = "unlimited";

      return this;
    },

    fastestLapCarIdx: function(playerIdx: number, lapTimeInSec: number, sessionIndex: number){
      session.data.SessionInfo.Sessions[sessionIndex].ResultsPositions = session.data.SessionInfo.Sessions[sessionIndex].ResultsPositions || []
      session.data.SessionInfo.Sessions[sessionIndex].ResultsPositions.push({
        CarIdx: playerIdx,
        FastestTime: lapTimeInSec
      } as iRacing.ResultsPosition);

      return this;
    },

    driverCarEstLapTime: function(lapTimeInSec: number){
      session.data.DriverInfo = session.data.DriverInfo || {} as iRacing.DriverInfo;
      session.data.DriverInfo.DriverCarEstLapTime = lapTimeInSec;
      return this;
    },

    // events

    carReset: function(){
      telemetry.values.EnterExitReset = 1;

      return this;
    },

    sessionChange: function(){
      session.data.WeekendInfo.SubSessionID = session.data.WeekendInfo.SubSessionID+1;

      return this;
    },

    applyMock: function() {
      iRacingService.getLatestTelemetry.mockReturnValue(telemetry);
      iRacingService.getLatestSession.mockReturnValue(session);
    }
  }
};
