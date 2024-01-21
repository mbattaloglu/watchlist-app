import { useState, useContext, useEffect, useRef } from "react";
import { ModalContext } from "../../contexts/modalContext/modal.context";
import {
  createDebouncedInputObservable,
  createFocusObservable,
  createOutsideClickObservable,
  createSearchInputObservable,
} from "./observables/search-input.observables";
import styles from "./search-input.module.scss";
import {
  createOutsideClickObserver,
  createSearchEmptyInputObserver,
  createSearchInputFocusObserver,
  createSearchObserver,
  createSearchResultBoxObserver,
} from "./observers/search-input.observers";

type SearchInputProps = {
  callApi: (searchText: string) => void;
  setLoading: (loading: boolean) => void;
  resultBox: React.RefObject<HTMLDivElement>;
};

const SearchInput: React.FC<SearchInputProps> = ({
  callApi,
  setLoading,
  resultBox,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const modalContext = useContext(ModalContext);

  const { setModal } = modalContext;

  useEffect(() => {
    if (!searchInputRef.current || !resultBox.current) return;
    //open the search result box when inputting
    const searchInputObservable$ = createSearchInputObservable(
      searchInputRef.current,
    );
    const searchResultBoxObserver = createSearchResultBoxObserver(
      resultBox.current,
      setSearchText,
      setModal,
      setLoading,
    );
    const resultBoxSubscription = searchInputObservable$.subscribe(
      searchResultBoxObserver,
    );

    //api calling handler
    const debouncedInputObservable$ = createDebouncedInputObservable(
      searchInputObservable$,
    );
    const searchObserver = createSearchObserver(callApi, setModal);
    const searchSubscription =
      debouncedInputObservable$.subscribe(searchObserver);

    //outside clicking handler
    const outsideClickObservable$ = createOutsideClickObservable(
      resultBox,
      searchInputRef,
    );
    const outsideClickObserver = createOutsideClickObserver(resultBox.current);
    const outsideClickSubscription =
      outsideClickObservable$.subscribe(outsideClickObserver);

    //open on focus
    const focusObservable$ = createFocusObservable(searchInputRef.current);
    const focusObserver = createSearchInputFocusObserver(resultBox.current);
    const focusSubscription = focusObservable$.subscribe(focusObserver);

    //close on when input is empty
    const closeOnEmptyInputObservable$ = createSearchEmptyInputObserver(
      resultBox.current,
    );
    const closeOnEmptySubscription = searchInputObservable$.subscribe(
      closeOnEmptyInputObservable$,
    );

    return () => {
      searchSubscription.unsubscribe();
      resultBoxSubscription.unsubscribe();
      outsideClickSubscription.unsubscribe();
      focusSubscription.unsubscribe();
      closeOnEmptySubscription.unsubscribe();
    };
  }, []);

  return (
    <input
      className={styles["search-input"]}
      type="text"
      placeholder="Search..."
      defaultValue={searchText}
      ref={searchInputRef}
    />
  );
};

export default SearchInput;
