import { render, screen, act } from "@testing-library/react";
import StakingContainer from "../index";
import { useAccount } from "wagmi";

describe("StakingContainer", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should show connect CTA when not connected", async () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: false,
      isConnected: false,
      address: null,
    });

    render(<StakingContainer />);

    // After the effect runs, should show CTA
    await act(async () => {
      // Wait for next tick to let useEffect run
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(
      screen.queryByTestId("staking-form-skeleton")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("staking-connect-cta")).toBeInTheDocument();
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

  it("should show Staking Form when connected", () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnecting: false,
      isConnected: true,
      address: "0xeEBd581f950d4D249989063C18508F32890DFdC3",
    });
    render(<StakingContainer />);
    expect(screen.getByTestId("staking-form")).toBeInTheDocument();
  });
});
