import { createContext, useEffect, useState } from "react";
import { Stock } from "../../types/APIStockResult";
import fetchStockData from "../../utils/fetchStockData/fetchStockData";

type StockContextProps = {
  stocks: Stock[];
  addToStocks: (stock: Stock) => void;
  removeFromStocks: (symbol: string) => void;
  cleanStocks: () => void;
};

type StockProviderProps = {
  children: React.ReactNode;
};

type StockLocalStorage = {
  stocks: Stock[];
  lastSaved: Date;
};

const StockContext = createContext<StockContextProps>({
  stocks: [],
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
  const [stocks, setStocks] = useState<Stock[]>([]);

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
          const stocks: StockLocalStorage = {
            stocks: updatedStocks,
            lastSaved: new Date(),
          };
          localStorage.setItem("stocks", JSON.stringify(stocks));
          setStocks(updatedStocks);
        });
      } else {
        setStocks(parsed.stocks);
      }
    } else {
      const stocks: StockLocalStorage = {
        stocks: [],
        lastSaved: new Date(),
      };
      localStorage.setItem("stocks", JSON.stringify(stocks));
    }
  }, []);

  const addToStocks = (stock: Stock) => {
    setStocks((prevStocks) => {
      const updatedStocks = [...prevStocks, stock];
      const stocks: StockLocalStorage = {
        stocks: updatedStocks,
        lastSaved: new Date(),
      };
      localStorage.setItem("stocks", JSON.stringify(stocks));
      return updatedStocks;
    });
  };

  const removeFromStocks = (symbol: string) => {
    setStocks((prevStocks) => {
      const updatedStocks = prevStocks.filter((s) => s.symbol !== symbol);
      const stocks: StockLocalStorage = {
        stocks: updatedStocks,
        lastSaved: new Date(),
      };
      localStorage.setItem("stocks", JSON.stringify(stocks));
      return updatedStocks;
    });
  };

  const cleanStocks = () => {
    const stocks: StockLocalStorage = {
      stocks: [],
      lastSaved: new Date(),
    };
    setStocks([]);
    localStorage.setItem("stocks", JSON.stringify(stocks));
  };

  return (
    <StockContext.Provider
      value={{ stocks, addToStocks, removeFromStocks, cleanStocks }}
    >
      {children}
    </StockContext.Provider>
  );
};

export { StockContext, StockProvider };
