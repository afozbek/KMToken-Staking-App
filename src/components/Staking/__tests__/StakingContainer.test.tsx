import { render, screen } from "@testing-library/react";
import StakingContainer from "../index";
import { useAccount, useReadContract } from "wagmi";

// Mock the entire wagmi module and its dependencies
jest.mock("wagmi", () => ({
  useAccount: jest.fn(),
  useConnect: jest.fn(),
  useDisconnect: jest.fn(),
  useBalance: jest.fn(),
  useConnectorClient: jest.fn(),
  getAccount: jest.fn(),
  useReadContract: jest.fn(),
}));

jest.mock("@/app/hooks/wagmi/utils", () => ({
  useClientConnect: jest.fn(() => ({
    connectAccount: jest.fn(),
  })),
  useEthersSigner: jest.fn(),
}));

jest.mock("viem", () => ({
  createWalletClient: jest.fn(),
  custom: jest.fn(),
  parseEther: jest.fn(),
  formatEther: jest.fn(),
}));

(useReadContract as jest.Mock).mockReturnValue({
  data: "1000000000000000000000000",
  isFetching: false,
  refetch: jest.fn(),
});

describe("StakingContainer", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should render form when connected", () => {
    // Set up mock return values
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: false,
      isConnected: true,
      address: "0xeEBd581f950d4D249989063C18508F32890DFdC3",
    });
    render(<StakingContainer />);
    expect(screen.getByTestId("staking-form")).toBeInTheDocument();
  });

  it("should render skeleton when loading", () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: true,
      isConnected: false,
      address: null,
    });

    render(<StakingContainer />);
    expect(screen.getByTestId("staking-form-skeleton")).toBeInTheDocument();
  });

  it("should render connect CTA when not connected", () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: false,
      isConnected: false,
      address: null,
    });

    render(<StakingContainer />);
    expect(screen.getByTestId("staking-connect-cta")).toBeInTheDocument();
  });
});
