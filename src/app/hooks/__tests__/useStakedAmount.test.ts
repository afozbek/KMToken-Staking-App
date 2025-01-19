import { renderHook, act } from "@testing-library/react";
import { useStakedAmount } from "../useStakedAmount";
import { getStakedAmount } from "@/blockchain";
import { JsonRpcSigner } from "ethers";

// Mock the blockchain functions
jest.mock("@/blockchain", () => ({
  getStakedAmount: jest.fn(),
}));

describe("useStakedAmount", () => {
  const mockSigner = {} as JsonRpcSigner;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial data when skip is true", () => {
    const { result } = renderHook(() =>
      useStakedAmount({ signer: mockSigner, skip: true })
    );

    expect(result.current.data).toEqual({
      amount: "0",
      formattedAmount: "0",
      reward: "0",
      formattedAmountWithReward: "0",
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should fetch and format staked amount correctly", async () => {
    const mockAmount = "1000000000000000000"; // 1 ETH in wei
    const mockReward = "500000000000000000"; // 0.5 ETH in wei

    (getStakedAmount as jest.Mock).mockResolvedValueOnce({
      amount: mockAmount,
      reward: mockReward,
    });

    const { result } = renderHook(() =>
      useStakedAmount({ signer: mockSigner, skip: false })
    );

    // Should start with loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to finish
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify the final state
    expect(result.current.data).toEqual({
      amount: mockAmount,
      formattedAmount: "1.0",
      reward: mockReward,
      formattedAmountWithReward: "1.5",
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Failed to fetch staked amount");
    (getStakedAmount as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() =>
      useStakedAmount({ signer: mockSigner, skip: false })
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({
      amount: "0",
      formattedAmount: "0",
      reward: "0",
      formattedAmountWithReward: "0",
    });
  });

  it("should handle refetch correctly", async () => {
    const mockAmount = "2000000000000000000"; // 2 ETH in wei
    const mockReward = "1000000000000000000"; // 1 ETH in wei

    (getStakedAmount as jest.Mock).mockResolvedValueOnce({
      amount: mockAmount,
      reward: mockReward,
    });

    const { result } = renderHook(() =>
      useStakedAmount({ signer: mockSigner, skip: false })
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Setup mock for refetch
    (getStakedAmount as jest.Mock).mockResolvedValueOnce({
      amount: mockAmount,
      reward: mockReward,
    });

    // Trigger refetch
    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual({
      amount: mockAmount,
      formattedAmount: "2.0",
      reward: mockReward,
      formattedAmountWithReward: "3",
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
