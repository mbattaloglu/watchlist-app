import { APIStockResult } from "../../types/APIStockResult";
import fetchStockData from "./fetchStockData";
import { FetchMock } from "jest-fetch-mock";

const fetchMock = fetch as FetchMock;

describe("fetchStockData test suite", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("should throw an error when no stock symbol provided", async () => {
    await fetchStockData([]).then((data) => {
      expect(data).toEqual({
        message: "No stock symbols provided",
        quoteResponse: {
          error: null,
          result: [],
        },
        error: undefined,
      });
    });
  });
  it("should throw an error when API key is not provided", async () => {
    process.env.REACT_APP_API_KEY = "";
    process.env.REACT_APP_API_KEY_TWO = "";
    process.env.REACT_APP_API_KEY_THREE = "";

    await expect(fetchStockData(["AAPL"])).rejects.toThrow("API Key not found");
  });
  it("should throw an error when API Endpoint is not provided", async () => {
    process.env.REACT_APP_API_KEY = "test-key";
    process.env.REACT_APP_API_KEY_TWO = "test-key-2";
    process.env.REACT_APP_API_KEY_THREE = "test-key-3";
    process.env.REACT_APP_STOCK_API_ENDPOINT = "";

    await expect(fetchStockData(["AAPL"])).rejects.toThrow(
      "API Endpoint not found",
    );
  });
  it("should return the data when API call is performed with valid data", async () => {
    process.env.REACT_APP_API_KEY = "test-key-1";
    process.env.REACT_APP_API_KEY_TWO = "test-key-2";
    process.env.REACT_APP_API_KEY_THREE = "test-key-3";
    process.env.REACT_APP_STOCK_API_ENDPOINT =
      "https://best-stock-data-api.com?symbols=";

    const mockData: APIStockResult = {
      quoteResponse: {
        error: null,
        result: [],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchStockData(["AAPL"]);

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://best-stock-data-api.com?symbols=AAPL",
      {
        headers: {
          "x-api-key": "test-key-3",
        },
      },
    );
  });
  it("should throw an error when API call fails", async () => {
    process.env.REACT_APP_API_KEY = "test-key-1";
    process.env.REACT_APP_API_KEY_TWO = "test-key-2";
    process.env.REACT_APP_API_KEY_THREE = "test-key-3";
    process.env.REACT_APP_STOCK_API_ENDPOINT =
      "https://best-stock-data-api.com?symbols=";

    fetchMock.mockRejectOnce(new Error("API call failed"));

    await expect(fetchStockData(["AAPL"])).rejects.toThrow("API call failed");
  });
  it("should throw an error when api !response.ok", async () => {
    process.env.REACT_APP_API_KEY = "test-key-1";
    process.env.REACT_APP_API_KEY_TWO = "test-key-2";
    process.env.REACT_APP_API_KEY_THREE = "test-key-3";
    process.env.REACT_APP_STOCK_API_ENDPOINT =
      "https://best-stock-data-api.com?symbols=";

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 401 });

    await expect(fetchStockData(["AAPL"])).rejects.toThrow(
      "Response failed. Please try again later.",
    );
  });
});
