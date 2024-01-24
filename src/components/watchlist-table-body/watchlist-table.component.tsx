import { useContext, useEffect, useState } from "react";
import WatchlistTableItem from "../watchlist-table-item/watchlist-table-item.component";
import { StockContext } from "../../contexts/stockContext/stock.context";
import { StockAPIStock } from "../../types/StockAPIResult";

const WatchlistTableBody: React.FC = () => {
  const stockContext = useContext(StockContext);
  const [stocksData, setStocksData] = useState<StockAPIStock[]>([]);
  const { stocks } = stockContext;

  useEffect(() => {
    const sub = stocks.subscribe(setStocksData);

    return () => sub.unsubscribe();
  }, []);

  return (
    <tbody>
      {stocksData.map((stock) => (
        <WatchlistTableItem stock={stock} key={stock.symbol} />
      ))}
    </tbody>
  );
};

export default WatchlistTableBody;
