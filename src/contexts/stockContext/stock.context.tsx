import { createContext, useContext, useEffect, useState } from "react";
import { StockAPIStock } from "../../types/StockAPIResult";
import fetchStockData from "../../utils/fetchStockData/fetchStockData";
import { ModalContext } from "../modalContext/modal.context";

type StockContextProps = {
  stocks: StockAPIStock[];
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
  const [stocks, setStocks] = useState<StockAPIStock[]>([]);
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

  const addToStocks = (symbol: string): void => {
    fetchStockData([symbol])
      .then((data) => {
        setStocks((prevStocks) => {
          if (data.quoteResponse) {
            const updatedStocks = [...prevStocks, data.quoteResponse.result[0]];
            const stocks: StockLocalStorage = {
              stocks: updatedStocks,
              lastSaved: new Date(),
            };
            localStorage.setItem("stocks", JSON.stringify(stocks));
            return updatedStocks;
          } else {
            setModal("Error", "Stock cannot be added.");
            return prevStocks;
          }
        });
      })
      .catch((error: Error) => {
        setModal("Error", `Stock cannot be added.\n${error}`);
        console.error(error);
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
