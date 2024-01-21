import { render, screen } from "@testing-library/react";
import WatchlistTableHead from "./watchlist-table-head.component";

describe("watchlist-table-head test suite", () => {
  it("should render the component", () => {
    const { container } = render(
      <table>
        <WatchlistTableHead />
      </table>,
    );
    expect(container).toBeTruthy();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Current Price")).toBeInTheDocument();
    expect(screen.getByText("Change")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });
});
