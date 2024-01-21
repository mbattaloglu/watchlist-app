import { render, screen } from "@testing-library/react";
import SearchResultBoxItem from "./search-result-box-item.component";
import mockSearchAPIStock from "../../mocks/mockSearchAPIStock";
import { WatchlistProvider } from "../../contexts/watchlistContext/watchlist.context";
import { StockProvider } from "../../contexts/stockContext/stock.context";
import { ModalProvider } from "../../contexts/modalContext/modal.context";

describe("search-result-box-item", () => {
  it("should render", () => {
    const { container } = render(
      <WatchlistProvider>
        <StockProvider>
          <ModalProvider>
            <SearchResultBoxItem stock={mockSearchAPIStock} />
          </ModalProvider>
        </StockProvider>
      </WatchlistProvider>,
    );
    expect(container).toBeTruthy();
    expect(screen.getByText(mockSearchAPIStock.symbol)).toBeInTheDocument();
    expect(screen.getByText(mockSearchAPIStock.name)).toBeInTheDocument();
    expect(screen.getByText(mockSearchAPIStock.exch)).toBeInTheDocument();
    expect(screen.getByText(mockSearchAPIStock.type)).toBeInTheDocument();
  });
});
