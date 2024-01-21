import { render, screen, fireEvent } from "@testing-library/react";
import { WatchlistProvider, WatchlistContext } from "./watchlist.context";
import { StockSearchResult } from "../../types/APISearchResult";
import { useContext } from "react";

describe("WatchlistProvider", () => {
  const testStock: StockSearchResult = {
    symbol: "TEST",
    name: "Test Stock",
    exch: "Test Exchange",
    exchDisp: "Test Exchange Display",
    type: "Test Type",
    typeDisp: "Test Type Display",
  };

  it("should add and remove from the watchlist", () => {
    const TestComponent = () => {
      const context = useContext(WatchlistContext);
      const { watchlist, addToWatchlist, removeFromWatchlist } = context;

      return (
        <div>
          <button onClick={() => addToWatchlist(testStock)}>
            Add to Watchlist
          </button>
          <button onClick={() => removeFromWatchlist(testStock.symbol)}>
            Remove from Watchlist
          </button>
          {watchlist.map((stock) => (
            <div key={stock.symbol}>{stock.name}</div>
          ))}
        </div>
      );
    };

    render(
      <WatchlistProvider>
        <TestComponent />
      </WatchlistProvider>,
    );

    fireEvent.click(screen.getByText("Add to Watchlist"));
    expect(screen.getByText("Test Stock")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remove from Watchlist"));
    expect(screen.queryByText("Test Stock")).not.toBeInTheDocument();
  });
  it("should clean the watchlist", () => {
    const TestComponent = () => {
      const context = useContext(WatchlistContext);
      const { watchlist, addToWatchlist, cleanWatchlist } = context;

      return (
        <div>
          <button onClick={() => addToWatchlist(testStock)}>
            Add to Watchlist
          </button>
          <button onClick={() => cleanWatchlist()}>Clean Watchlist</button>
          {watchlist.map((stock) => (
            <div key={stock.symbol}>{stock.name}</div>
          ))}
        </div>
      );
    };

    render(
      <WatchlistProvider>
        <TestComponent />
      </WatchlistProvider>,
    );

    fireEvent.click(screen.getByText("Add to Watchlist"));
    expect(screen.getByText("Test Stock")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clean Watchlist"));
    expect(screen.queryByText("Test Stock")).not.toBeInTheDocument();
  });
});
