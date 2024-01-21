export interface APIStockResult {
  quoteResponse?: QuoteResponse;
  error?: APIError;
  message?: string;
}

export interface QuoteResponse {
  result: Stock[];
  error: null;
}

export interface APIError {
  error: APIErrorInfo;
}

export interface APIErrorInfo {
  code: string;
  description: string;
}

export interface Stock {
  postMarketPrice?: number;
  postMarketChange?: number;
  postMarketChangePercent?: number;
  postMarketTime?: number;
  epsCurrentYear?: number;
  priceEpsCurrentYear?: number;
  trailingPE?: number;
  typeDisp?: string;
  customPriceAlertConfidence?: string;
  firstTradeDateMilliseconds?: number;
  fiftyTwoWeekChangePercent?: number;
  dividendRate?: number;
  dividendYield?: number;
  cryptoTradeable?: boolean;
  language?: string;
  region?: string;
  quoteType?: string;
  triggerable?: boolean;
  quoteSourceName?: string;
  financialCurrency?: string;
  averageDailyVolume3Month?: number;
  averageDailyVolume10Day?: number;
  fiftyTwoWeekLowChange?: number;
  exchange?: string;
  trailingAnnualDividendRate?: number;
  trailingAnnualDividendYield?: number;
  regularMarketChangePercent?: number;
  regularMarketDayRange?: string;
  currency?: string;
  twoHundredDayAverage?: number;
  twoHundredDayAverageChange?: number;
  marketCap?: number;
  market?: string;
  gmtOffSetMilliseconds?: number;
  regularMarketPreviousClose?: number;
  bid?: number;
  ask?: number;
  bidSize?: number;
  askSize?: number;
  preMarketChange?: number;
  sharesOutstanding?: number;
  preMarketPrice?: number;
  fiftyTwoWeekLowChangePercent?: number;
  fiftyTwoWeekRange?: string;
  fiftyTwoWeekHighChange?: number;
  esgPopulated?: boolean;
  tradeable?: boolean;
  earningsTimestamp?: number;
  earningsTimestampStart?: number;
  earningsTimestampEnd?: number;
  preMarketChangePercent?: number;
  twoHundredDayAverageChangePercent?: number;
  preMarketTime?: number;
  priceHint?: number;
  fiftyTwoWeekHighChangePercent?: number;
  fiftyTwoWeekLow?: number;
  fiftyTwoWeekHigh?: number;
  dividendDate?: number;
  messageBoardId?: string;
  fullExchangeName?: string;
  longName?: string;
  marketState?: string;
  epsTrailingTwelveMonths?: number;
  epsForward?: number;
  forwardPE?: number;
  priceToBook?: number;
  exchangeDataDelayedBy?: number;
  shortName?: string;
  regularMarketPrice?: number;
  regularMarketTime?: number;
  regularMarketChange: number;
  regularMarketOpen: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketVolume?: number;
  bookValue?: number;
  fiftyDayAverage?: number;
  fiftyDayAverageChange?: number;
  fiftyDayAverageChangePercent?: number;
  sourceInterval?: number;
  exchangeTimezoneName?: string;
  exchangeTimezoneShortName?: string;
  symbol: string;
}
