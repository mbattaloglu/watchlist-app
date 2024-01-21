import { StockAPIStock } from "../types/StockAPIResult";

export type StockRecord = {
  stocks: StockAPIStock[];
  lastSaved: string;
};

const stocks: StockRecord = {
  stocks: [
    {
      regularMarketPrice: 531.4,
      regularMarketChange: 8.869995,
      longName: "NVIDIA Corporation",
      shortName: "NVIDIA Corporation",
      symbol: "NVDA",
    },
  ],
  lastSaved: "2024-01-10T12:39:43.690Z",
};

export default stocks;
