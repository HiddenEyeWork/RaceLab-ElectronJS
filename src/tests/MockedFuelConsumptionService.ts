import {
  IFuelConsumptionTrackerService,
  TrackedFuelConsumptionCollection
} from "../renderer/server/datastream/services/computations/FuelConsumptionTrackerService";

export const mockedIRacingConsumptionService = jest.fn() as jest.Mock<
  any extends IFuelConsumptionTrackerService
>;

mockedIRacingConsumptionService.mockImplementation(
  (...args: any): IFuelConsumptionTrackerService => {
    return {
      calculate: jest.fn(),
      getAllConsumption: jest.fn() as jest.Mock<
        TrackedFuelConsumptionCollection
      >
    };
  }
);
