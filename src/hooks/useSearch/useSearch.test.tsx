import { act, renderHook } from "@testing-library/react";
import useSearch from "./useSearch";
import { FetchMock } from "jest-fetch-mock";
import { APISearchResult } from "../../types/APISearchResult";
import { ModalProvider } from "../../contexts/modalContext/modal.context";
import { ReactNode } from "react";

const fetchMock = fetch as FetchMock;

describe("useSearch custom hook test suite", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("should return data with successful", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ModalProvider>{children}</ModalProvider>
    );
    const { result } = renderHook(() => useSearch(), { wrapper });

    const mockResult: APISearchResult = {
      ResultSet: {
        Result: [],
        Query: "test",
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResult));

    await act(async () => {
      await result.current?.callApi("test");
    });

    expect(result.current?.apiSearchResults).toEqual(mockResult);
  });
  it("should trigger an error when api call fails", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ModalProvider>{children}</ModalProvider>
    );
    const { result } = renderHook(() => useSearch(), { wrapper });

    fetchMock.mockRejectOnce(new Error("fake error message"));

    await act(async () => {
      await result.current?.callApi("test");
    });

    expect(result.current.error).toEqual(Error("fake error message"));
  });
});
