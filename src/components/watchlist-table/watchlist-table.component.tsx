import { useContext } from "react";
import WatchlistTableBody from "../watchlist-table-body/watchlist-table.component";
import WatchlistTableHead from "../watchlist-table-head/watchlist-table-head.component";
import styles from "./watchlist-table.module.scss";
import { StockContext } from "../../contexts/stockContext/stock.context";
import { useObservableState } from "observable-hooks";

const WatchlistTable: React.FC = () => {
  const stockContext = useContext(StockContext);

  const { stocks } = stockContext;
  const stocksState = useObservableState(stocks, []);

  if (stocksState.length === 0) {
    return (
      <div style={{ marginTop: "1rem" }}>
        <p>
          Your watchlist is empty. You can search stocks and add them to your
          watchlist.
        </p>
      </div>
    );
  }

  return (
    <table className={styles.table}>
      <WatchlistTableHead />
      <WatchlistTableBody />
    </table>
  );
};

export default WatchlistTable;
