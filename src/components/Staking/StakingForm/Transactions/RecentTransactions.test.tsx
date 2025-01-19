import { render, screen } from "@testing-library/react";
import RecentTransactions from "./RecentTransactions";
import { Transaction } from "@/store/transactionsStore";

describe("RecentTransactions", () => {
  const mockTransactions: Transaction[] = [
    {
      hash: "0x123",
      action: "stake",
      amount: "100",
    },
    {
      hash: "0x456",
      action: "unstake",
      amount: "50",
    },
  ];

  it("renders correctly on desktop", () => {
    render(<RecentTransactions transactions={mockTransactions} />);

    // Check if title is rendered
    expect(screen.getByText("Recent Transactions")).toBeInTheDocument();

    // Check if transactions are rendered with correct content
    expect(screen.getByText("stake")).toBeInTheDocument();
    expect(screen.getByText("100 KMT")).toBeInTheDocument();
    expect(screen.getByText("unstake")).toBeInTheDocument();
    expect(screen.getByText("50 KMT")).toBeInTheDocument();

    // Check if links are correct and have proper attributes
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute(
      "href",
      "https://sepolia.basescan.org/tx/0x123"
    );
    expect(links[0]).toHaveAttribute("target", "_blank");
    expect(links[0]).toHaveAttribute("rel", "noopener noreferrer");

    expect(links[1]).toHaveAttribute(
      "href",
      "https://sepolia.basescan.org/tx/0x456"
    );

    // Check desktop specific styles
    const container = screen.getByTestId("recent-transactions-container");
    expect(container).toHaveClass(
      "absolute",
      "top-0",
      "-right-2",
      "z-0",
      "translate-x-full",
      "w-80"
    );
  });

  it("renders correctly on mobile", () => {
    render(
      <RecentTransactions transactions={mockTransactions} isMobile={true} />
    );

    // Check mobile specific styles
    const container = screen.getByTestId("recent-transactions-container");
    expect(container).toHaveClass("w-full", "mt-6");
    expect(container).not.toHaveClass(
      "absolute",
      "top-0",
      "-right-2",
      "translate-x-full",
      "w-80"
    );

    // Verify content is still present in mobile view
    expect(screen.getByText("stake")).toBeInTheDocument();
    expect(screen.getByText("100 KMT")).toBeInTheDocument();
  });

  it("shows no transactions message when empty", () => {
    render(<RecentTransactions transactions={[]} />);

    expect(screen.getByText("No transactions found")).toBeInTheDocument();
  });

  it("renders external link icons for each transaction", () => {
    render(<RecentTransactions transactions={mockTransactions} />);

    // Check if external link icons are present
    const externalLinks = screen.getAllByRole("link");
    expect(externalLinks).toHaveLength(2);

    // Each transaction should have an external link icon
    externalLinks.forEach((link) => {
      expect(link.querySelector("svg")).toBeInTheDocument();
    });
  });
});
