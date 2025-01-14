import { render, screen } from "@testing-library/react";
import StakingContainer from "../index";
import { useAccount } from "wagmi";

// Mock wagmi hooks
jest.mock("wagmi", () => ({
  useAccount: jest.fn(),
}));

describe("StakingContainer", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should render loading skeleton when not mounted", () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: true,
      isConnected: false,
      address: null,
    });

    render(<StakingContainer />);
    expect(screen.getByTestId("staking-form-skeleton")).toBeInTheDocument();
  });

  it("should render StakingConnectCTA when not connected", () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: false,
      isConnected: false,
      address: null,
    });

    render(<StakingContainer />);
    expect(screen.getByTestId("staking-connect-cta")).toBeInTheDocument();
  });

  it("should render StakingForm when connected", () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: false,
      isConnected: true,
      address: "0x123",
    });

    render(<StakingContainer />);
    expect(screen.getByTestId("staking-form")).toBeInTheDocument();
  });
});
