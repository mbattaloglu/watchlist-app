import { render, screen } from "@testing-library/react";
import SearchResultBox from "./search-result-box.component";
import apiSearchResult from "../../mocks/apiSearchResult";
import { WatchlistProvider } from "../../contexts/watchlistContext/watchlist.context";
import { StockProvider } from "../../contexts/stockContext/stock.context";
import React from "react";
import { ModalProvider } from "../../contexts/modalContext/modal.context";

describe("search-result-box test suite", () => {
  it("should render the search-result-box", () => {
    const searchInputMockRef = { current: null };
    jest.spyOn(React, "useRef").mockReturnValue(searchInputMockRef);

    const searchResultBoxMockRef = { current: null };
    jest.spyOn(React, "useRef").mockReturnValue(searchResultBoxMockRef);

    const { container } = render(
      <WatchlistProvider>
        <StockProvider>
          <ModalProvider>
            <SearchResultBox
              error={null}
              apiSearchResults={apiSearchResult}
              searchInputRef={searchInputMockRef}
              searchResultBoxRef={searchResultBoxMockRef}
              searchText="null"
            />
          </ModalProvider>
        </StockProvider>
      </WatchlistProvider>,
    );
    expect(container).toBeTruthy();
    expect(
      screen.getByText(apiSearchResult.ResultSet?.Result[0].name as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(apiSearchResult.ResultSet?.Result[0].symbol as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(apiSearchResult.ResultSet?.Result[0].exch as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(apiSearchResult.ResultSet?.Result[0].type as string),
    ).toBeInTheDocument();
  });
  it("should render the search-result-box with error", () => {
    const searchInputMockRef = { current: null };
    jest.spyOn(React, "useRef").mockReturnValue(searchInputMockRef);

    const searchResultBoxMockRef = { current: null };
    jest.spyOn(React, "useRef").mockReturnValue(searchResultBoxMockRef);

    const error = new Error("Test Message");
    const { container } = render(
      <WatchlistProvider>
        <StockProvider>
          <ModalProvider>
            <SearchResultBox
              error={error}
              apiSearchResults={null}
              searchInputRef={searchInputMockRef}
              searchResultBoxRef={searchResultBoxMockRef}
              searchText="null"
            />
          </ModalProvider>
        </StockProvider>
      </WatchlistProvider>,
    );
    expect(container).toBeTruthy();
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});