import { createContext, useContext, useEffect } from "react";
import { StockAPIStock } from "../../types/StockAPIResult";
import fetchStockData from "../../utils/fetchStockData/fetchStockData";
import { ModalContext } from "../modalContext/modal.context";
import { BehaviorSubject } from "rxjs";

type StockContextProps = {
  stocks: BehaviorSubject<StockAPIStock[]>;
  addToStocks: (symbol: string) => void;
  removeFromStocks: (symbol: string) => void;
  cleanStocks: () => void;
};

type StockProviderProps = {
  children: React.ReactNode;
};

type StockLocalStorage = {
  stocks: StockAPIStock[];
  lastSaved: Date;
};

const StockContext = createContext<StockContextProps>({
  stocks: new BehaviorSubject<StockAPIStock[]>([]),
  addToStocks: () => {
    throw new Error("StockContext not initialized.");
  },
  removeFromStocks: () => {
    throw new Error("StockContext not initialized.");
  },
  cleanStocks: () => {
    throw new Error("StockContext not initialized.");
  },
});

const StockProvider: React.FC<StockProviderProps> = ({ children }) => {
  const stocks = new BehaviorSubject<StockAPIStock[]>([]);
  const modalContext = useContext(ModalContext);
  const { setModal } = modalContext;

  useEffect(() => {
    const stocksFromLocalStorage = localStorage.getItem("stocks");
    if (stocksFromLocalStorage) {
      const parsed: StockLocalStorage = JSON.parse(stocksFromLocalStorage);

      const now = new Date();
      const lastSaved = new Date(parsed.lastSaved);

      //if now-lastSaved > 1 day, fetch new data
      const diff = now.getTime() - lastSaved.getTime(); //ms
      const diffInDays = diff / (1000 * 60 * 60 * 24); //ms * s * h * d  -> convert to days;

      if (diffInDays > 1) {
        const symbols = parsed.stocks.map((s) => s.symbol);
        fetchStockData(symbols).then((data) => {
          const updatedStocks = data.quoteResponse?.result?.filter(
            (s) => s !== null,
          );
          if (!updatedStocks) return;
          const localStorageRecord: StockLocalStorage = {
            stocks: updatedStocks,
            lastSaved: new Date(),
          };
          localStorage.setItem("stocks", JSON.stringify(localStorageRecord));
          stocks.next(updatedStocks);
        });
      } else {
        stocks.next(parsed.stocks);
      }
    } else {
      const stocks: StockLocalStorage = {
        stocks: [],
        lastSaved: new Date(),
      };
      localStorage.setItem("stocks", JSON.stringify(stocks));
    }
  }, []);

  const addToStocks = (symbol: string): void => {
    fetchStockData([symbol])
      .then((data) => {
        if (data.quoteResponse) {
          const currentStocks = stocks.getValue();
          const apiResult = data.quoteResponse.result[0];
          const newStock: StockAPIStock = {
            symbol: apiResult.symbol,
            longName: apiResult.longName,
            regularMarketChange: apiResult.regularMarketChange,
            regularMarketPrice: apiResult.regularMarketPrice,
            shortName: apiResult.shortName,
          };
          const updatedStocks = [...currentStocks, newStock];
          const localStorageRecord: StockLocalStorage = {
            stocks: updatedStocks,
            lastSaved: new Date(),
          };
          localStorage.setItem("stocks", JSON.stringify(localStorageRecord));
          stocks.next(updatedStocks);
        } else {
          const error = data.error ? "" + data.error : "";
          setModal("Error", "Stock cannot be added" + error);
        }
      })
      .catch((error: Error) => {
        setModal("Error", `Stock cannot be added.\n${error}`);
        console.error(error);
      });
  };

  const removeFromStocks = (symbol: string) => {
    const currentStocks = stocks.getValue();
    const updatedStocks = currentStocks.filter((s) => s.symbol !== symbol);
    const localStorageRecord: StockLocalStorage = {
      stocks: updatedStocks,
      lastSaved: new Date(),
    };
    localStorage.setItem("stocks", JSON.stringify(localStorageRecord));
    stocks.next(updatedStocks);
  };

  const cleanStocks = () => {
    const localStorageRecord: StockLocalStorage = {
      stocks: [],
      lastSaved: new Date(),
    };
    stocks.next([]);
    localStorage.setItem("stocks", JSON.stringify(localStorageRecord));
  };

  return (
    <StockContext.Provider
      value={{
        stocks,
        addToStocks,
        removeFromStocks,
        cleanStocks,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export { StockContext, StockProvider };
