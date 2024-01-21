export interface APISearchResult {
  ResultSet?: ResultSet;
  message?: string;
}

export interface ResultSet {
  Query: string;
  Result: StockSearchResult[];
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  exch: string;
  type: string;
  exchDisp: string;
  typeDisp: string;
}
