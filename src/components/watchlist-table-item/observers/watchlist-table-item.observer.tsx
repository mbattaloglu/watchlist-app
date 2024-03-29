export const createRemoveButtonObserver = (
  symbol: string,
  removeFromStocks: (symbol: string) => void,
  setModal: (title: string, description: string) => void,
) => {
  return {
    next: () => {
      removeFromStocks(symbol);
    },
    error: (err: Error) => {
      setModal("Error", err.message);
      console.error(err);
    },
    complete: () => {
      console.log("Observer Completed.");
    },
  };
};
