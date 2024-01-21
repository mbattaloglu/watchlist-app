import { SearchAPIResult } from "../../types/SearchAPIResult";
import isValid from "../isValidString/isValid";

const fetchSearchResults = async (
  searchText: string,
): Promise<SearchAPIResult> => {
  const apiKey = process.env.REACT_APP_API_KEY_THREE;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const apiEndpoint = process.env.REACT_APP_SEARCH_API_ENDPOINT;
  if (!apiEndpoint) {
    throw new Error("API Endpoint not found");
  }

  if (!searchText) {
    return {
      message: "No search text provided",
      ResultSet: {
        Result: [],
        Query: "",
      },
    };
  }

  if (!isValid(searchText)) {
    return {
      message: "Invalid search text provided",
      ResultSet: {
        Result: [],
        Query: "",
      },
    };
  }

  const response = await fetch(apiEndpoint + searchText, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Response failed. Please try again later.");
  } else {
    const data: SearchAPIResult = await response.json();
    return data;
  }
};

export default fetchSearchResults;
