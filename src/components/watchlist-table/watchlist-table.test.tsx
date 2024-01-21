import { render, screen } from "@testing-library/react";
import {
  WatchlistContext,
  WatchlistProvider,
} from "../../contexts/watchlistContext/watchlist.context";
import {
  StockContext,
  StockProvider,
} from "../../contexts/stockContext/stock.context";
import WatchlistTable from "./watchlist-table.component";
import { ModalProvider } from "../../contexts/modalContext/modal.context";
import watchlist from "../../mocks/watchlist";
import stocks from "../../mocks/stockRecord";

describe("watchlist-table test suite", () => {
  beforeEach(() => {
    // Reset all mocks and restore original implementations
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  it("should render the component when contexts are not empty", () => {
    const { container } = render(
      <WatchlistContext.Provider
        value={{
          watchlist: watchlist,
          addToWatchlist: jest.fn(),
          removeFromWatchlist: jest.fn(),
          cleanWatchlist: jest.fn(),
        }}
      >
        <StockContext.Provider
          value={{
            stocks: stocks.stocks,
            addToStocks: jest.fn(),
            removeFromStocks: jest.fn(),
            cleanStocks: jest.fn(),
          }}
        >
          <ModalProvider>
            <WatchlistTable />
          </ModalProvider>
        </StockContext.Provider>
      </WatchlistContext.Provider>,
    );
    expect(container).toBeTruthy();
  });
  it("should render the component when contexts are empty", () => {
    const { container } = render(
      <WatchlistProvider>
        <StockProvider>
          <ModalProvider>
            <WatchlistTable />
          </ModalProvider>
        </StockProvider>
      </WatchlistProvider>,
    );
    expect(container).toBeTruthy();
    //test is there a table element
    expect(
      screen.getByText(
        "Your watchlist is empty. You can search stocks and add them to your watchlist.",
      ),
    ).toBeInTheDocument();
  });
});
