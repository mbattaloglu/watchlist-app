export interface StockAPIResult {
  quoteResponse?: StockAPIQuoteResponse;
  error?: StockAPIError;
  message?: string;
}

export interface StockAPIQuoteResponse {
  result: StockAPIStock[];
  error: null;
}

export interface StockAPIError {
  error: StockAPIErrorInfo;
}

export interface StockAPIErrorInfo {
  code: string;
  description: string;
}

//regularMarketPrice
//regularMarketChange
//regularMarketChangePercent
//regularMarketPreviousClose
export interface StockAPIStock {
  symbol: string;
  shortName: string;
  longName: string;
  regularMarketPrice: number;
  regularMarketChange: number;
}
