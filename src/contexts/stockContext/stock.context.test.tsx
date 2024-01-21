import { render, screen, fireEvent } from "@testing-library/react";
import { StockProvider, StockContext } from "./stock.context";
import { StockAPIStock } from "../../types/StockAPIResult";
import { useContext } from "react";
import fetchStockData from "../../utils/fetchStockData/fetchStockData";
import { act } from "react-dom/test-utils";
import mockStockAPIStocks from "../../mocks/mockStockAPIStocks";

jest.mock("../../utils/fetchStockData/fetchStockData");

describe("StockProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const testStock: StockAPIStock = {
    symbol: "TEST",
    longName: "TEST",
    shortName: "TEST",
    regularMarketChange: 0,
    regularMarketPrice: 0,
  };

  it("should add and remove from the stocks", () => {
    const TestComponent = () => {
      const context = useContext(StockContext);
      const { stocks, addToStocks, removeFromStocks } = context;

      return (
        <div>
          <button onClick={() => addToStocks(testStock)}>Add to Stocks</button>
          <button onClick={() => removeFromStocks(testStock.symbol)}>
            Remove from Stocks
          </button>
          {stocks.map((stock) => (
            <div key={stock.symbol}>{stock.symbol}</div>
          ))}
        </div>
      );
    };

    render(
      <StockProvider>
        <TestComponent />
      </StockProvider>,
    );

    fireEvent.click(screen.getByText("Add to Stocks"));
    expect(screen.getByText("TEST")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remove from Stocks"));
    expect(screen.queryByText("TEST")).not.toBeInTheDocument();
  });
  it("should add and remove from the stocks", () => {
    const TestComponent = () => {
      const context = useContext(StockContext);
      const { stocks, addToStocks, cleanStocks } = context;

      return (
        <div>
          <button onClick={() => addToStocks(testStock)}>Add to Stocks</button>
          <button onClick={() => cleanStocks()}>Clean Stocks</button>
          {stocks.map((stock) => (
            <div key={stock.symbol}>{stock.symbol}</div>
          ))}
        </div>
      );
    };

    render(
      <StockProvider>
        <TestComponent />
      </StockProvider>,
    );

    fireEvent.click(screen.getByText("Add to Stocks"));
    expect(screen.getByText("TEST")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clean Stocks"));
    expect(screen.queryByText("TEST")).not.toBeInTheDocument();
  });
  it("should fetch stock data and save it to local storage if diffInDays > 1", async () => {
    const testStocks = mockStockAPIStocks;

    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 2); // set the date to 2 days ago

    const localStorageMock = {
      stocks: testStocks,
      lastSaved: oldDate,
    };

    localStorage.setItem("stocks", JSON.stringify(localStorageMock));

    const mockFetchStockData = fetchStockData as jest.MockedFunction<
      typeof fetchStockData
    >;
    mockFetchStockData.mockResolvedValueOnce({
      quoteResponse: {
        result: testStocks,
        error: null,
      },
    });

    await act(async () => {
      render(
        <StockProvider>
          <div></div>
        </StockProvider>,
      );
    });

    expect(mockFetchStockData).toHaveBeenCalledTimes(1);
    expect(mockFetchStockData).toHaveBeenCalledWith(
      testStocks.map((s) => s.symbol),
    );
  });
  it("should directly set the stock data from local storage if diffInDays < 1", async () => {
    const testStocks = mockStockAPIStocks;

    const localStorageMock = {
      stocks: testStocks,
      lastSaved: new Date(), //todays date
    };

    localStorage.setItem("stocks", JSON.stringify(localStorageMock));

    const mockFetchStockData = fetchStockData as jest.MockedFunction<
      typeof fetchStockData
    >;
    mockFetchStockData.mockResolvedValueOnce({
      quoteResponse: {
        result: testStocks,
        error: null,
      },
    });

    await act(async () => {
      render(
        <StockProvider>
          <div></div>
        </StockProvider>,
      );
    });

    expect(mockFetchStockData).toHaveBeenCalledTimes(0);
  });
});
