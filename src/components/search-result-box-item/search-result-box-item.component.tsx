import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from "./search-result-box-item.module.scss";
import { SearchAPIStock } from "../../types/SearchAPIResult";
import { fromEvent } from "rxjs";
import { StockContext } from "../../contexts/stockContext/stock.context";
import { ModalContext } from "../../contexts/modalContext/modal.context";
import { createCheckboxObserver } from "./observers/search-result-item-observers";
import { StockAPIStock } from "../../types/StockAPIResult";

type SearchResultBoxItemProps = {
  stock: SearchAPIStock;
};

const SearchResultBoxItem: React.FC<SearchResultBoxItemProps> = ({ stock }) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const stockContext = useContext(StockContext);
  const modalContext = useContext(ModalContext);

  const { stocks, addToStocks, removeFromStocks } = stockContext;
  const { setModal } = modalContext;

  const [stocksData, setStocksData] = useState<StockAPIStock[]>([]);

  const isChecked = useCallback(
    (stock: SearchAPIStock) => {
      return stocksData.some((s) => s.symbol === stock.symbol);
    },
    [stocksData],
  );

  useEffect(() => {
    const stocksSub = stocks.subscribe(setStocksData);

    if (checkboxRef.current) {
      const checkboxObservable$ = fromEvent(checkboxRef.current, "change");
      const checkboxObserver = createCheckboxObserver(
        stock.symbol,
        addToStocks,
        removeFromStocks,
        setModal,
      );

      const checkboxSubscription =
        checkboxObservable$.subscribe(checkboxObserver);

      //clean up when unmount
      return () => {
        stocksSub.unsubscribe();
        checkboxSubscription.unsubscribe();
      };
    }
  }, []);

  return (
    <div className={styles["info-box-item"]}>
      <div className={styles.left}>
        <h4>{stock.name}</h4>
        <p className={styles.silent}>{stock.symbol}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h4>{stock.exch}</h4>
          <p className={styles.silent}>{stock.type}</p>
        </div>
        <div>
          <input
            type="checkbox"
            id={stock.symbol}
            className={styles.toggle}
            defaultChecked={isChecked(stock)}
            ref={checkboxRef}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResultBoxItem;
