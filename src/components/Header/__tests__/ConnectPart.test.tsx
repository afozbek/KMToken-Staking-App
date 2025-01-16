import { render, screen } from "@testing-library/react";
import ConnectPart from "../ConnectPart";

const mockProps = {
  address: "0x123",
  connected: true,
  balance: "100",
  onMenuToggle: jest.fn(),
  showMenu: false,
  setShowMenu: jest.fn(),
};

describe("ConnectPart", () => {
  it("should render connect button when not connected", () => {
    render(<ConnectPart {...mockProps} connected={false} address="" />);
    expect(screen.getByTestId("connect-btn")).toBeInTheDocument();
  });
});
