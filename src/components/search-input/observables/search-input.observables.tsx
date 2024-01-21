import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from "rxjs";

export const createSearchInputObservable = (inputElement: HTMLInputElement) => {
  return fromEvent(inputElement, "input").pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    distinctUntilChanged(),
  );
};

export const createDebouncedInputObservable = (
  searchInputObservable$: Observable<string>,
) => {
  return searchInputObservable$.pipe(debounceTime(250));
};

export const createOutsideClickObservable = (
  searchResultBoxRef: React.MutableRefObject<HTMLDivElement | null>,
  searchInputRef: React.MutableRefObject<HTMLInputElement | null>,
) => {
  return fromEvent(document, "click").pipe(
    filter((event: Event) => {
      const target = event.target as HTMLInputElement;
      return (
        !searchResultBoxRef.current?.contains(target) &&
        !searchInputRef.current?.contains(target)
      );
    }),
  );
};

export const createFocusObservable = (element: HTMLInputElement) => {
  return fromEvent(element, "focus").pipe(
    filter((event: Event) => {
      const target = event.target as HTMLInputElement;
      return target.value.length > 0;
    }),
  );
};
