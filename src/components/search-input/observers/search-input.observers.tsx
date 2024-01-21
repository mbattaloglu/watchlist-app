import changeDisplayStatus from "../../../utils/changeDisplayStatus/changeDisplayStatus";

export const createSearchObserver = (
  callApi: (searchText: string) => void,
  setModal: (title: string, content: string) => void,
) => {
  return {
    next: (searchText: string) => {
      callApi(searchText);
    },
    error: (err: Error) => {
      setModal("Error", err.message);
      console.error(err);
    },
    complete: () => console.log('"createSearchObserver" Observer Completed.'),
  };
};

export const createSearchResultBoxObserver = (
  element: HTMLElement,
  setSearchText: (searchText: string) => void,
  setModal: (title: string, content: string) => void,
  setLoading: (loading: boolean) => void,
) => {
  return {
    next: (searchText: string) => {
      setLoading(true);
      setSearchText(searchText);
      changeDisplayStatus(element, "block");
    },
    error: (err: Error) => {
      setModal("Error", err.message);
      console.error(err);
    },
    complete: () =>
      console.log('"createSearchResultBoxObserver" Observer Completed.'),
  };
};

export const createOutsideClickObserver = (element: HTMLElement) => {
  return {
    next: () => {
      changeDisplayStatus(element, "none");
    },
    error: (err: Error) => {
      console.error(err);
    },
    complete: () => console.log("Observer Completed."),
  };
};

export const createSearchInputFocusObserver = (element: HTMLElement) => {
  return {
    next: () => {
      changeDisplayStatus(element, "block");
    },
    error: (err: Error) => {
      console.error(err);
    },
    complete: () => console.log("Observer Completed."),
  };
};

export const createSearchEmptyInputObserver = (element: HTMLElement) => {
  return {
    next: (searchText: string) => {
      if (searchText === "") {
        changeDisplayStatus(element, "none");
      }
    },
    error: (err: Error) => {
      console.error(err);
    },
    complete: () => console.log("Observer Completed."),
  };
};
