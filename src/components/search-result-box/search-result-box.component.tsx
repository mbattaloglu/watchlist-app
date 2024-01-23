import { useMemo } from "react";
import { SearchAPIResult } from "../../types/SearchAPIResult";
import SearchResultBoxItem from "../search-result-box-item/search-result-box-item.component";
import styles from "./search-result.box.module.scss";

type SearchResultBoxProps = {
  readonly apiSearchResults: SearchAPIResult | null;
  readonly error: Error | null;
  readonly loading: boolean;
  readonly resultBox: React.RefObject<HTMLDivElement>;
};

const SearchResultBox: React.FC<SearchResultBoxProps> = ({
  apiSearchResults,
  error,
  loading,
  resultBox,
}) => {
  const renderResults = () =>
    useMemo(() => {
      if (error) {
        return (
          <div className={styles["result-box-container"]}>
            <img
              src={`${process.env.PUBLIC_URL}/error.png`}
              alt="error"
              width={96}
              height={96}
            />
            <h1>{error.message}</h1>
          </div>
        );
      }

      if (loading) {
        return (
          <div className={styles["result-box-container"]}>
            <img
              src={`${process.env.PUBLIC_URL}/loading-spinner.svg`}
              alt="loading"
            />
          </div>
        );
      }

      if (apiSearchResults?.ResultSet?.Result.length === 0) {
        return (
          <div className={styles["result-box-container"]}>
            <img
              src={`${process.env.PUBLIC_URL}/empty-box.png`}
              width="196px"
              height="196px"
              alt="empty-result"
            />
            <h1>No results found</h1>
            <p className={styles.silent}>{apiSearchResults?.message}</p>
          </div>
        );
      }

      return apiSearchResults?.ResultSet?.Result.map((stock) => {
        return <SearchResultBoxItem key={stock.symbol} stock={stock} />;
      });
    }, [apiSearchResults, error, loading]);

  return (
    <div className={styles["search-bar"]}>
      <div className={styles["search-result-box"]} ref={resultBox}>
        {renderResults()}
      </div>
    </div>
  );
};

export default SearchResultBox;
