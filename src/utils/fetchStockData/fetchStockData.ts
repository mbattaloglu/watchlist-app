import { APIStockResult } from "../../types/APIStockResult";

const fetchStockData = async (
  stockSymbols: string[],
): Promise<APIStockResult> => {
  const apiKey = process.env.REACT_APP_API_KEY_THREE;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const apiEndpoint = process.env.REACT_APP_STOCK_API_ENDPOINT;
  if (!apiEndpoint) {
    throw new Error("API Endpoint not found");
  }

  if (stockSymbols.length === 0) {
    return {
      message: "No stock symbols provided",
      quoteResponse: {
        result: [],
        error: null,
      },
      error: undefined,
    };
  }
  const encodedSymbols = encodeURIComponent(stockSymbols.join(","));

  const response = await fetch(apiEndpoint + encodedSymbols, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Response failed. Please try again later.");
  } else {
    const data: APIStockResult = await response.json();
    return data;
  }
};

export default fetchStockData;
