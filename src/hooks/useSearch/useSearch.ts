import { useContext, useEffect, useRef, useState } from "react";
import { APISearchResult } from "../../types/APISearchResult";
import fetchSearchResults from "../../utils/fetchSearchResults/fetchSearchResults";
import { ModalContext } from "../../contexts/modalContext/modal.context";

const useSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [apiSearchResults, setApiSearchResults] =
    useState<APISearchResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const firstRender = useRef(true);

  const modalContext = useContext(ModalContext);

  const { setModal } = modalContext;

  useEffect(() => {
    if (error) {
      setModal("Error", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (!firstRender.current) {
      setLoading(true);
      fetchSearchResults(searchText)
        .then((data) => {
          setApiSearchResults(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
        });
      return;
    }
    firstRender.current = false;
  }, [searchText]);

  return {
    apiSearchResults,
    callApi: setSearchText,
    error,
    isApiFetching: loading,
  };
};

export default useSearch;
