import { SearchAPIStock } from "../types/SearchAPIResult";

const watchlist: SearchAPIStock[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    exch: "NGM",
    type: "S",
    exchDisp: "NASDAQ",
    typeDisp: "Equity",
  },
  {
    symbol: "U",
    name: "Unity Software Inc.",
    exch: "NYS",
    type: "S",
    exchDisp: "NYSE",
    typeDisp: "Equity",
  },
  {
    symbol: "MMM",
    name: "3M Company",
    exch: "NYQ",
    type: "S",
    exchDisp: "NYSE",
    typeDisp: "Equity",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    exch: "NAS",
    type: "S",
    exchDisp: "NASDAQ",
    typeDisp: "Equity",
  },
];

export default watchlist;
