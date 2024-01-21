import commonStyles from "../../styles/common-styles.module.scss";
import WatchlistTable from "../../components/watchlist-table/watchlist-table.component";
import styles from "./watchlist.module.scss";
import { useContext, useEffect, useRef } from "react";
import { StockContext } from "../../contexts/stockContext/stock.context";
import { fromEvent } from "rxjs";
import { ModalContext } from "../../contexts/modalContext/modal.context";
import ErrorModal from "../../components/error-modal/error-modal.component";

const Watchlist: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const stockContext = useContext(StockContext);
  const modalContext = useContext(ModalContext);

  const { cleanStocks, stocks } = stockContext;
  const { setModal, modal, closeModal } = modalContext;

  useEffect(() => {
    if (buttonRef.current) {
      const buttonObservable$ = fromEvent(buttonRef.current, "click");
      const buttonObserver = {
        next: () => {
          cleanStocks();
        },
        error: (err: Error) => {
          setModal("Error", err.message);
          console.error(err);
        },
        complete: () => console.log("Observer Completed."),
      };

      const buttonSubscription = buttonObservable$.subscribe(buttonObserver);

      return () => buttonSubscription.unsubscribe();
    }
  }, []);

  const showButton = () => {
    if (stocks.length > 0) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  };

  return (
    <div className={commonStyles.container}>
      <div className={styles.container}>
        <h1>Your Watchlist</h1>
        <button
          className={styles["btn-danger"]}
          ref={buttonRef}
          style={showButton()}
        >
          Clean the Watchlist
        </button>
      </div>
      <WatchlistTable />
      {modalContext && modal && (
        <ErrorModal
          title={modal.title}
          description={modal.description}
          onClick={closeModal}
        />
      )}
    </div>
  );
};

export default Watchlist;
