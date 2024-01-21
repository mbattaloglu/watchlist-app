import React, { createContext, useEffect, useState } from "react";
import { StockSearchResult } from "../../types/APISearchResult";

type WatchlistContextProps = {
  watchlist: StockSearchResult[];
  addToWatchlist: (stock: StockSearchResult) => void;
  removeFromWatchlist: (symbol: string) => void;
  cleanWatchlist: () => void;
};

type WatchlistProviderProps = {
  children: React.ReactNode;
};

const WatchlistContext = createContext<WatchlistContextProps>({
  watchlist: [],
  addToWatchlist: () => {
    throw new Error("WatchlistContext not initialized.");
  },
  removeFromWatchlist: () => {
    throw new Error("WatchlistContext not initialized.");
  },
  cleanWatchlist: () => {
    throw new Error("WatchlistContext not initialized.");
  },
});

const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<StockSearchResult[]>([]);

  useEffect(() => {
    const watchlistFromLocalStorage = localStorage.getItem("watchlist");
    if (watchlistFromLocalStorage) {
      const parsed = JSON.parse(watchlistFromLocalStorage);
      setWatchlist(parsed);
    } else {
      localStorage.setItem("watchlist", JSON.stringify([]));
    }
  }, []);

  const addToWatchlist = (stock: StockSearchResult) => {
    //we need to do it like this because of the async behavior of useState
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = [...prevWatchlist, stock];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  const removeFromWatchlist = (symbol: string) => {
    //same as above
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.filter((s) => s.symbol !== symbol);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
  };

  const cleanWatchlist = () => {
    setWatchlist([]);
    localStorage.setItem("watchlist", JSON.stringify([]));
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, cleanWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export { WatchlistContext, WatchlistProvider };
