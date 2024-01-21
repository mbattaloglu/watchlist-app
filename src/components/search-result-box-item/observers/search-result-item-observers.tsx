import { SearchAPIStock } from "../../../types/SearchAPIResult";
import { StockAPIStock } from "../../../types/StockAPIResult";
import fetchStockData from "../../../utils/fetchStockData/fetchStockData";

export const createCheckboxObserver = (
  stock: SearchAPIStock,
  addToWatchlist: (stock: SearchAPIStock) => void,
  addToStocks: (stock: StockAPIStock) => void,
  removeFromWatchlist: (symbol: string) => void,
  removeFromStocks: (symbol: string) => void,
  setModal: (title: string, description: string) => void,
) => {
  return {
    next: async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.checked) {
        addToWatchlist(stock);
        await fetchStockData([stock.symbol])
          .then((data) => {
            if (data) {
              if (data.quoteResponse) {
                addToStocks(data.quoteResponse.result[0]);
              } else if (data.error) {
                setModal("Error", data.error.error.description);
                console.error(data.error.error.description);
              }
            }
          })
          .catch((err) => {
            setModal("Error", err.message);
            console.error(err);
          });
      } else {
        removeFromWatchlist(stock.symbol);
        removeFromStocks(stock.symbol);
      }
    },
    error: (err: Error) => {
      setModal("Error", err.message);
      console.error(err);
    },
    complete: () => console.log("Observer Completed."),
  };
};
