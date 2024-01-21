export interface SearchAPIResult {
  ResultSet?: SearchAPIResultSet;
  message?: string;
}

export interface SearchAPIResultSet {
  Query: string;
  Result: SearchAPIStock[];
}

export interface SearchAPIStock {
  symbol: string;
  name: string;
  exch: string;
  type: string;
  exchDisp: string;
  typeDisp: string;
}
