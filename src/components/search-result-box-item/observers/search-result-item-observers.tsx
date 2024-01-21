export const createCheckboxObserver = (
  symbol: string,
  addToStocks: (symbol: string) => void,
  removeFromStocks: (symbol: string) => void,
  setModal: (title: string, description: string) => void,
) => {
  return {
    next: (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.checked) {
        addToStocks(symbol);
      } else {
        removeFromStocks(symbol);
      }
    },
    error: (err: Error) => {
      setModal("Error", err.message);
      console.error(err);
    },
    complete: () => console.log("Observer Completed."),
  };
};
