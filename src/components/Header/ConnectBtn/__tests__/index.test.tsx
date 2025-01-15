import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ConnectBtn from "../index";
import { useClientConnect } from "@/app/hooks/wagmi/utils";

describe("ConnectBtn", () => {
  const mockConnectAccount = jest.fn();

  beforeEach(() => {
    (useClientConnect as jest.Mock).mockReturnValue({
      connectAccount: mockConnectAccount,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders connect wallet button", () => {
    render(<ConnectBtn />);

    const button = screen.getByTestId("connect-btn");
    expect(button).toBeInTheDocument();
  });

  it("shows correct text", () => {
    render(<ConnectBtn />);

    const button = screen.getByTestId("connect-btn");
    expect(button).toHaveTextContent("Connect Wallet");
  });

  it("calls connectAccount when clicked", () => {
    render(<ConnectBtn />);

    const button = screen.getByTestId("connect-btn");
    fireEvent.click(button);

    expect(mockConnectAccount).toHaveBeenCalledTimes(1);
  });
});
