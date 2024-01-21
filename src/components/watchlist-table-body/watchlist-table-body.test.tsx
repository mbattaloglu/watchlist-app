import { render } from "@testing-library/react";
import { StockProvider } from "../../contexts/stockContext/stock.context";
import { WatchlistProvider } from "../../contexts/watchlistContext/watchlist.context";
import WatchlistTableBody from "./watchlist-table.component";
import { ModalProvider } from "../../contexts/modalContext/modal.context";

describe("watchlist-table-body test suite", () => {
  it("should render the component", () => {
    const { container } = render(
      <WatchlistProvider>
        <StockProvider>
          <ModalProvider>
            <table>
              <WatchlistTableBody />
            </table>
          </ModalProvider>
        </StockProvider>
      </WatchlistProvider>,
    );
    expect(container).toBeTruthy();
  });
});
