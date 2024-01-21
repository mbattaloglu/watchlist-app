import { createCheckboxObserver } from "./search-result-item-observers";
import fetchStockData from "../../../utils/fetchStockData/fetchStockData";

jest.mock("../../../utils/fetchStockData/fetchStockData");

// Mock the console.error function to prevent error logs during testing
console.error = jest.fn();

// Mock the console.log function to prevent logs during testing
console.log = jest.fn();

describe("createCheckboxObserver", () => {
  const mockStock = { symbol: "AAPL" };
  const addToStocks = jest.fn();
  const removeFromStocks = jest.fn();
  const setModal = jest.fn();

  const observer = createCheckboxObserver(
    mockStock,
    addToStocks,
    removeFromStocks,
    setModal,
  );

  it("should add to watchlist and fetch stock data when next is called with a checked event", async () => {
    const mockEvent = { target: { checked: true } };
    const mockData = { quoteResponse: { result: [mockStock] } };

    (fetchStockData as jest.Mock).mockResolvedValue(mockData);

    await observer.next(mockEvent);
    expect(fetchStockData).toHaveBeenCalledWith([mockStock.symbol]);
    expect(addToStocks).toHaveBeenCalledWith(mockStock);
  });

  it("should remove from watchlist and stocks when next is called with an unchecked event", () => {
    const mockEvent = { target: { checked: false } };

    observer.next(mockEvent);

    expect(removeFromStocks).toHaveBeenCalledWith(mockStock.symbol);
  });

  it("should set modal and log an error when next is called and fetchStockData rejects", async () => {
    const mockEvent = { target: { checked: true } };
    const error = new Error("Test error");

    (fetchStockData as jest.Mock).mockRejectedValue(error);

    await observer.next(mockEvent);

    expect(setModal).toHaveBeenCalledWith("Error", error.message);
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it("should log an error when error is called", () => {
    const error = new Error("Test error");

    observer.error(error);

    expect(setModal).toHaveBeenCalledWith("Error", error.message);
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('should log "Observer Completed." when complete is called', () => {
    observer.complete();

    expect(console.log).toHaveBeenCalledWith("Observer Completed.");
  });
});
