import { useContext, useEffect, useRef } from "react";
import styles from "./watchlist-table.module.scss";
import { WatchlistContext } from "../../contexts/watchlistContext/watchlist.context";
import { fromEvent } from "rxjs";
import { StockContext } from "../../contexts/stockContext/stock.context";
import { Stock } from "../../types/APIStockResult";
import { ModalContext } from "../../contexts/modalContext/modal.context";
import giveColor from "../../utils/giveColor/giveColor";
import { createRemoveButtonObserver } from "./observers/watchlist-table-item.observer";

type WatchlistTableItemProps = {
  stock: Stock;
};

const WatchlistTableItem: React.FC<WatchlistTableItemProps> = ({ stock }) => {
  const removeButtonRef = useRef<HTMLButtonElement>(null);
  const watchlistContext = useContext(WatchlistContext);
  const stockContext = useContext(StockContext);
  const modalContext = useContext(ModalContext);

  const { removeFromWatchlist } = watchlistContext;
  const { removeFromStocks } = stockContext;
  const { setModal } = modalContext;

  useEffect(() => {
    if (removeButtonRef.current) {
      const removeObservable$ = fromEvent(removeButtonRef.current, "click");

      const removeObserver = createRemoveButtonObserver(
        stock.symbol,
        removeFromStocks,
        removeFromWatchlist,
        setModal,
      );

      const subscription = removeObservable$.subscribe(removeObserver);

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  return (
    <tr>
      <td>
        <h4>{stock.shortName}</h4>
        <p className="silent">{stock.symbol}</p>
      </td>
      <td>{stock.regularMarketOpen.toFixed(2)}</td>
      <td
        className={`${styles["bold-text"]} ${giveColor(
          stock.regularMarketChange,
        )}`}
      >
        {stock.regularMarketChange.toFixed(2)}
      </td>
      <td>
        <button className={styles["remove-button"]} ref={removeButtonRef}>
          &#10005;
        </button>
      </td>
    </tr>
  );
};

export default WatchlistTableItem;