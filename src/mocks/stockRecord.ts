import { Stock } from "../types/APIStockResult";

export type StockRecord = {
  stocks: Stock[];
  lastSaved: string;
};

const stocks: StockRecord = {
  stocks: [
    {
      language: "en-US",
      region: "US",
      quoteType: "EQUITY",
      triggerable: true,
      quoteSourceName: "Nasdaq Real Time Price",
      priceHint: 2,
      epsTrailingTwelveMonths: 7.6,
      epsForward: 20.44,
      epsCurrentYear: 12.3,
      priceEpsCurrentYear: 43.203255,
      sharesOutstanding: 2470000128,
      bookValue: 13.489,
      fiftyDayAverage: 473.4846,
      fiftyDayAverageChange: 57.915436,
      fiftyDayAverageChangePercent: 0.12231747,
      twoHundredDayAverage: 411.7354,
      twoHundredDayAverageChange: 119.66461,
      twoHundredDayAverageChangePercent: 0.29063472,
      marketCap: 1312558153728,
      forwardPE: 25.998043,
      priceToBook: 39.395065,
      sourceInterval: 15,
      exchangeTimezoneName: "America/New_York",
      exchangeTimezoneShortName: "EST",
      gmtOffSetMilliseconds: -18000000,
      currency: "USD",
      regularMarketPrice: 531.4,
      regularMarketTime: 1704834000,
      regularMarketChange: 8.869995,
      regularMarketOpen: 524.01,
      regularMarketDayHigh: 543.25,
      regularMarketDayLow: 516.905,
      regularMarketVolume: 76476876,
      esgPopulated: false,
      tradeable: false,
      preMarketChange: 7.3899536,
      preMarketChangePercent: 1.3906574,
      preMarketTime: 1704888459,
      preMarketPrice: 538.79,
      dividendDate: 1703721600,
      regularMarketChangePercent: 1.6975092,
      regularMarketDayRange: "516.905 - 543.25",
      regularMarketPreviousClose: 522.53,
      bid: 0,
      ask: 0,
      bidSize: 8,
      askSize: 11,
      messageBoardId: "finmb_32307",
      fullExchangeName: "NasdaqGS",
      longName: "NVIDIA Corporation",
      financialCurrency: "USD",
      averageDailyVolume3Month: 42487236,
      averageDailyVolume10Day: 34610270,
      fiftyTwoWeekLowChange: 376.48004,
      fiftyTwoWeekLowChangePercent: 2.430158,
      fiftyTwoWeekRange: "154.92 - 543.25",
      fiftyTwoWeekHighChange: -11.849976,
      fiftyTwoWeekHighChangePercent: -0.021813117,
      fiftyTwoWeekLow: 154.92,
      fiftyTwoWeekHigh: 543.25,
      earningsTimestamp: 1708513140,
      earningsTimestampStart: 1708513140,
      earningsTimestampEnd: 1708513140,
      trailingAnnualDividendRate: 0.16,
      trailingPE: 69.92106,
      trailingAnnualDividendYield: 0.00030620248,
      marketState: "PRE",
      exchangeDataDelayedBy: 0,
      shortName: "NVIDIA Corporation",
      exchange: "NMS",
      market: "us_market",
      symbol: "NVDA",
    },
  ],
  lastSaved: "2024-01-10T12:39:43.690Z",
};

export default stocks;
