import "@testing-library/jest-dom";
import { useReadContract } from "wagmi";

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

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

(useReadContract as jest.Mock).mockReturnValue({
  data: "1000000000000000000000000",
  isFetching: false,
  refetch: jest.fn(),
});
