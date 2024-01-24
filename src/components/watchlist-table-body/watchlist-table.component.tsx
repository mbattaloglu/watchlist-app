import { useContext } from "react";
import WatchlistTableItem from "../watchlist-table-item/watchlist-table-item.component";
import { StockContext } from "../../contexts/stockContext/stock.context";
import { useObservableState } from "observable-hooks";

const WatchlistTableBody: React.FC = () => {
  const stockContext = useContext(StockContext);
  const { stocks } = stockContext;
  const x = useObservableState(stocks, []);

  return (
    <tbody>
      {x.map((stock) => (
        <WatchlistTableItem stock={stock} key={stock.symbol} />
      ))}
    </tbody>
  );
};

export default WatchlistTableBody;
