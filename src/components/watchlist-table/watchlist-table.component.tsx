import { useContext } from "react";
import WatchlistTableBody from "../watchlist-table-body/watchlist-table.component";
import WatchlistTableHead from "../watchlist-table-head/watchlist-table-head.component";
import styles from "./watchlist-table.module.scss";
import { WatchlistContext } from "../../contexts/watchlistContext/watchlist.context";
import { StockContext } from "../../contexts/stockContext/stock.context";

const WatchlistTable: React.FC = () => {
  const watchlistContext = useContext(WatchlistContext);
  const stockContext = useContext(StockContext);

  const { watchlist } = watchlistContext;
  const { stocks } = stockContext;

  if (watchlist.length === 0 || stocks.length === 0) {
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
