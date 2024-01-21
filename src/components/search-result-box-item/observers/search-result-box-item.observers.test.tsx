import { createCheckboxObserver } from "./search-result-item-observers";

// Mock the console.error function to prevent error logs during testing
console.error = jest.fn();

// Mock the console.log function to prevent logs during testing
console.log = jest.fn();

describe("createCheckboxObserver", () => {
  const mockStockSymbol = "test";
  const addToStocks = jest.fn();
  const removeFromStocks = jest.fn();
  const setModal = jest.fn();

  const observer = createCheckboxObserver(
    mockStockSymbol,
    addToStocks,
    removeFromStocks,
    setModal,
  );

  it("should add to watchlist and fetch stock data when next is called with a checked event", () => {
    const mockEvent = { target: { checked: true } };

    observer.next(mockEvent);
    expect(addToStocks).toHaveBeenCalledWith(mockStockSymbol);
  });

  it("should remove from watchlist and stocks when next is called with an unchecked event", () => {
    const mockEvent = { target: { checked: false } };

    observer.next(mockEvent);

    expect(removeFromStocks).toHaveBeenCalledWith(mockStockSymbol);
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
