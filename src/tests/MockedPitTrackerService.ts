import {
  IPitTrackerService,
  TrackedPitCollection,
  TrackedPitEntry
} from "../renderer/server/datastream/services/computations/PitTrackerService";

export const mockedIPitTrackerService = jest.fn() as jest.Mock<any extends IPitTrackerService>;

mockedIPitTrackerService.mockImplementation(
  (...args: any): IPitTrackerService => {
    return {
      calculate: jest.fn(),
      getEstimatedPitTimeForTrack: jest.fn(() => {
        return 0;
      }),
      getConfidenceScore: jest.fn(() => { return 0; }),
      getPitEntry: jest.fn(),
      getStints: jest.fn(),
      isConfidenceLevelReached: jest.fn(),
    };
  }
);
