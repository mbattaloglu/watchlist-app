import { render } from "@testing-library/react";
import { StockProvider } from "../../contexts/stockContext/stock.context";
import WatchlistTableBody from "./watchlist-table.component";
import { ModalProvider } from "../../contexts/modalContext/modal.context";

describe("watchlist-table-body test suite", () => {
  it("should render the component", () => {
    const { container } = render(
      <StockProvider>
        <ModalProvider>
          <table>
            <WatchlistTableBody />
          </table>
        </ModalProvider>
      </StockProvider>,
    );
    expect(container).toBeTruthy();
  });
});
