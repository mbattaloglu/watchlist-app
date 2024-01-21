import { SearchAPIResult } from "../types/SearchAPIResult";

const apiSearchResult: SearchAPIResult = {
  ResultSet: {
    Result: [
      {
        exch: "NAS",
        exchDisp: "NASDAQ",
        name: "Apple Inc.",
        symbol: "AAPL",
        type: "S",
        typeDisp: "Equity",
      },
    ],
    Query: "apple",
  },
};

export default apiSearchResult;
