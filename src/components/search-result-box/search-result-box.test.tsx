import { render, screen } from "@testing-library/react";
import SearchResultBox from "./search-result-box.component";
import mockSearchAPIResult from "../../mocks/mockSearchAPIResult";
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
      <StockProvider>
        <ModalProvider>
          <SearchResultBox
            error={null}
            apiSearchResults={mockSearchAPIResult}
            searchInputRef={searchInputMockRef}
            searchResultBoxRef={searchResultBoxMockRef}
            searchText="null"
          />
        </ModalProvider>
      </StockProvider>,
    );
    expect(container).toBeTruthy();
    expect(
      screen.getByText(mockSearchAPIResult.ResultSet?.Result[0].name as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        mockSearchAPIResult.ResultSet?.Result[0].symbol as string,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockSearchAPIResult.ResultSet?.Result[0].exch as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockSearchAPIResult.ResultSet?.Result[0].type as string),
    ).toBeInTheDocument();
  });
  it("should render the search-result-box with error", () => {
    const searchInputMockRef = { current: null };
    jest.spyOn(React, "useRef").mockReturnValue(searchInputMockRef);

    const searchResultBoxMockRef = { current: null };
    jest.spyOn(React, "useRef").mockReturnValue(searchResultBoxMockRef);

    const error = new Error("Test Message");
    const { container } = render(
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
      </StockProvider>,
    );
    expect(container).toBeTruthy();
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});
