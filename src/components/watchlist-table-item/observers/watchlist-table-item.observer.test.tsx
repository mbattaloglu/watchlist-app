import { createRemoveButtonObserver } from "./watchlist-table-item.observer";
import stock from "../../../mocks/stock";
import watchlist from "../../../mocks/watchlist";

describe("createRemoveButtonObserver", () => {
  it("calls removeFromStocks and removeFromWatchlist when next is called", () => {
    const mockRemoveFromStocks = jest.fn();
    const mockRemoveFromWatchlist = jest.fn();
    const mockSetModal = jest.fn();
    const observer = createRemoveButtonObserver(
      stock.symbol,
      mockRemoveFromStocks,
      mockRemoveFromWatchlist,
      mockSetModal,
    );

    observer.next();

    expect(mockRemoveFromStocks).toHaveBeenCalledWith(stock.symbol);
    expect(mockRemoveFromWatchlist).toHaveBeenCalledWith(stock.symbol);
  });
  it("calls setModal when error is called", () => {
    const mockRemoveFromStocks = jest.fn();
    const mockRemoveFromWatchlist = jest.fn();
    const mockSetModal = jest.fn();

    const observer = createRemoveButtonObserver(
      stock.symbol,
      mockRemoveFromStocks,
      mockRemoveFromWatchlist,
      mockSetModal,
    );

    const error = new Error("Testing Error");
    observer.error(error);

    expect(mockSetModal).toHaveBeenCalledWith("Error", "Testing Error");
  });
  it("logs a message when complete is called", () => {
    const mockRemoveFromStocks = jest.fn();
    const mockRemoveFromWatchlist = jest.fn();
    const mockSetModal = jest.fn();

    const observer = createRemoveButtonObserver(
      stock,
      mockRemoveFromStocks,
      mockRemoveFromWatchlist,
      watchlist,
      mockSetModal,
    );

    const consoleSpy = jest.spyOn(console, "log");
    observer.complete();

    expect(consoleSpy).toHaveBeenCalledWith("Observer Completed.");
  });
});
