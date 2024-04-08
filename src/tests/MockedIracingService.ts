import { IiRacingService } from "../renderer/server/datastream/services/iracingService/IiRacingService";

export const mockedIRacingService = jest.fn() as jest.Mock<IiRacingService>;
mockedIRacingService.mockImplementation(
  (...args: any): IiRacingService => {
    return {
      dataIsReady: () => {
        return true;
      },
      setRefuel: (amount: number) => {
        return;
      },
      sendChatMessage: (msg: string) => {
        return;
      },
      isLiveService() {
        return true;
      },
      isConnected() {
        return false;
      },
      getLatestSession: jest.fn() as jest.Mock<iRacing.SessionInfoResponse>,
      getLatestTelemetry: jest.fn() as jest.Mock<iRacing.TelemetryResponse>,
    };
  }
);
