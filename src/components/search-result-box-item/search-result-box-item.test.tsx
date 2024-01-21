import { render, screen } from "@testing-library/react";
import SearchResultBoxItem from "./search-result-box-item.component";
import stockSearchResult from "../../mocks/stockSearchResult";
import { WatchlistProvider } from "../../contexts/watchlistContext/watchlist.context";
import { StockProvider } from "../../contexts/stockContext/stock.context";
import { ModalProvider } from "../../contexts/modalContext/modal.context";

describe("search-result-box-item", () => {
  it("should render", () => {
    const { container } = render(
      <WatchlistProvider>
        <StockProvider>
          <ModalProvider>
            <SearchResultBoxItem stock={stockSearchResult} />
          </ModalProvider>
        </StockProvider>
      </WatchlistProvider>,
    );
    expect(container).toBeTruthy();
    expect(screen.getByText(stockSearchResult.symbol)).toBeInTheDocument();
    expect(screen.getByText(stockSearchResult.name)).toBeInTheDocument();
    expect(screen.getByText(stockSearchResult.exch)).toBeInTheDocument();
    expect(screen.getByText(stockSearchResult.type)).toBeInTheDocument();
  });
});
