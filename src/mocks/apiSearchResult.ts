import { APISearchResult } from "../types/APISearchResult";

const apiSearchResult: APISearchResult = {
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
