import { FetchMock } from "jest-fetch-mock";
import fetchSearchResults from "./fetchSearchResults";
import { APISearchResult } from "../../types/APISearchResult";

const fetchMock = fetch as FetchMock;

describe("fetchSearchResults test suite", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("should return empty array when no search key provided", async () => {
    await fetchSearchResults("").then((data) => {
      expect(data).toEqual({
        message: "No search text provided",
        ResultSet: {
          Query: "",
          Result: [],
        },
      });
    });
  });
  it("should throw error when API key is not provided", async () => {
    process.env.REACT_APP_API_KEY = "";
    process.env.REACT_APP_API_KEY_TWO = "";
    process.env.REACT_APP_API_KEY_THREE = "";

    await expect(fetchSearchResults("apple")).rejects.toThrow(
      "API Key not found",
    );
  });
  it("should throw error when API endpoint is not provided", async () => {
    process.env.REACT_APP_API_KEY = "test-key-1";
    process.env.REACT_APP_API_KEY_TWO = "test-key-2";
    process.env.REACT_APP_API_KEY_THREE = "test-key-3";
    process.env.REACT_APP_SEARCH_API_ENDPOINT = "";

    await expect(fetchSearchResults("apple")).rejects.toThrow(
      "API Endpoint not found",
    );
  });
  it("should return the data when API call is performed with valid data", async () => {
    process.env.REACT_APP_API_KEY = "test-key";
    process.env.REACT_APP_API_KEY_TWO = "test-key-2";
    process.env.REACT_APP_API_KEY_THREE = "test-key-3";
    process.env.REACT_APP_SEARCH_API_ENDPOINT =
      "https://best-stock-data-api.com?query=";

    const mockData: APISearchResult = {
      ResultSet: {
        Query: "apple",
        Result: [],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchSearchResults("apple");

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://best-stock-data-api.com?query=apple",
      {
        headers: {
          "x-api-key": "test-key-3",
        },
      },
    );
  });
  it("should throw an error when API call fails", async () => {
    process.env.REACT_APP_API_KEY = "test-key";
    process.env.REACT_APP_API_KEY_TWO = "test-key-2";
    process.env.REACT_APP_API_KEY_THREE = "test-key-3";
    process.env.REACT_APP_SEARCH_API_ENDPOINT =
      "https://best-stock-data-api.com?query=";

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 401 });

    await expect(fetchSearchResults("AAPL")).rejects.toThrow(
      "Response failed. Please try again later.",
    );
  });
});
