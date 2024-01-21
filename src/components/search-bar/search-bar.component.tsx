import { useEffect, useRef, useState } from "react";
import useSearch from "../../hooks/useSearch/useSearch";
import SearchInput from "../search-input/search-input.component";
import SearchResultBox from "../search-result-box/search-result-box.component";

const SearchBar: React.FC = () => {
  const { callApi, apiSearchResults, error, isApiFetching } = useSearch();
  const resultBoxRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(isApiFetching);
  }, [isApiFetching]);

  return (
    <div>
      <SearchInput
        callApi={callApi}
        setLoading={setLoading}
        resultBox={resultBoxRef}
      />
      <SearchResultBox
        error={error}
        loading={loading}
        apiSearchResults={apiSearchResults}
        resultBox={resultBoxRef}
      />
    </div>
  );
};

export default SearchBar;
