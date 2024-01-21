import { render, screen } from "@testing-library/react";
import {
  StockContext,
  StockProvider,
} from "../../contexts/stockContext/stock.context";
import WatchlistTable from "./watchlist-table.component";
import { ModalProvider } from "../../contexts/modalContext/modal.context";
import mockStockRecord from "../../mocks/mockStockRecord";

describe("watchlist-table test suite", () => {
  beforeEach(() => {
    // Reset all mocks and restore original implementations
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  it("should render the component when contexts are not empty", () => {
    const { container } = render(
      <StockContext.Provider
        value={{
          stocks: mockStockRecord.stocks,
          addToStocks: jest.fn(),
          removeFromStocks: jest.fn(),
          cleanStocks: jest.fn(),
        }}
      >
        <ModalProvider>
          <WatchlistTable />
        </ModalProvider>
      </StockContext.Provider>,
    );
    expect(container).toBeTruthy();
  });
  it("should render the component when contexts are empty", () => {
    const { container } = render(
      <StockProvider>
        <ModalProvider>
          <WatchlistTable />
        </ModalProvider>
      </StockProvider>,
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
