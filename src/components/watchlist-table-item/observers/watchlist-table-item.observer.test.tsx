import { createRemoveButtonObserver } from "./watchlist-table-item.observer";
import mockStockAPIStock from "../../../mocks/mockStockAPIStock";

describe("createRemoveButtonObserver", () => {
  it("calls removeFromStocks and removeFromWatchlist when next is called", () => {
    const mockRemoveFromStocks = jest.fn();
    const mockSetModal = jest.fn();
    const observer = createRemoveButtonObserver(
      mockStockAPIStock.symbol,
      mockRemoveFromStocks,
      mockSetModal,
    );

    observer.next();

    expect(mockRemoveFromStocks).toHaveBeenCalledWith(mockStockAPIStock.symbol);
  });
  it("calls setModal when error is called", () => {
    const mockRemoveFromStocks = jest.fn();
    const mockSetModal = jest.fn();

    const observer = createRemoveButtonObserver(
      mockStockAPIStock.symbol,
      mockRemoveFromStocks,
      mockSetModal,
    );

    const error = new Error("Testing Error");
    observer.error(error);

    expect(mockSetModal).toHaveBeenCalledWith("Error", "Testing Error");
  });
  it("logs a message when complete is called", () => {
    const mockRemoveFromStocks = jest.fn();
    const mockSetModal = jest.fn();

    const observer = createRemoveButtonObserver(
      mockStockAPIStock,
      mockRemoveFromStocks,
      mockSetModal,
    );

    const consoleSpy = jest.spyOn(console, "log");
    observer.complete();

    expect(consoleSpy).toHaveBeenCalledWith("Observer Completed.");
  });
});
