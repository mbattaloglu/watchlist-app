import { render } from "@testing-library/react";
import { WatchlistProvider } from "../../contexts/watchlistContext/watchlist.context";
import { StockProvider } from "../../contexts/stockContext/stock.context";
import WatchlistTableItem from "./watchlist-table-item.component";
import stock from "../../mocks/stock";
import { ModalProvider } from "../../contexts/modalContext/modal.context";

describe("watchlist-table-item test suite", () => {
  it("should render the component", () => {
    const { container } = render(
      <WatchlistProvider>
        <StockProvider>
          <ModalProvider>
            <table>
              <tbody>
                <WatchlistTableItem stock={stock} />
              </tbody>
            </table>
          </ModalProvider>
        </StockProvider>
      </WatchlistProvider>,
    );

    expect(container).toBeTruthy();
  });
});
