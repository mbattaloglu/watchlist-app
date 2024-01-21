import {
  createSearchObserver,
  createSearchResultBoxObserver,
  createOutsideClickObserver,
} from "./search-input.observers";

console.error = jest.fn();
console.log = jest.fn();

describe("search-input createSearchObserver test suite", () => {
  it("should call the provided functions when next is called", () => {
    const mockCallApi = jest.fn();
    const mockSetModal = jest.fn();
    const observer = createSearchObserver(mockCallApi, mockSetModal);

    observer.next("apple");
    expect(mockCallApi).toBeCalledWith("apple");
  });
  it("should call the provided functions when error is called", () => {
    const mockCallApi = jest.fn();
    const mockSetModal = jest.fn();
    const observer = createSearchObserver(mockCallApi, mockSetModal);

    observer.error(new Error("Testing Error"));
    expect(mockSetModal).toBeCalledWith("Error", "Testing Error");
  });
  it("should call the provided functions when complete is called", () => {
    const mockCallApi = jest.fn();
    const mockSetModal = jest.fn();
    const observer = createSearchObserver(mockCallApi, mockSetModal);

    observer.complete();
    expect(mockCallApi).not.toBeCalled();
    expect(mockSetModal).not.toBeCalled();
  });
});

describe("search-input createSearchResultBoxObserver test suite", () => {
  it('should call the provided functions with "block" when next is called with a string', () => {
    const mockElement = document.createElement("div");
    mockElement.style.display = "none";
    const mockSetSearchText = jest.fn();
    const mockSetModal = jest.fn();
    const mockSetLoading = jest.fn();
    const observer = createSearchResultBoxObserver(
      mockElement,
      mockSetSearchText,
      mockSetModal,
      mockSetLoading,
    );

    observer.next("apple");
    expect(mockSetSearchText).toHaveBeenCalledWith("apple");
    expect(mockElement).toHaveStyle({
      display: "block",
    });
  });
  it("should call the provided functions when error is called", () => {
    const mockElement = document.createElement("div");
    const mockSetSearchText = jest.fn();
    const mockSetModal = jest.fn();
    const mockSetLoading = jest.fn();
    const observer = createSearchResultBoxObserver(
      mockElement,
      mockSetSearchText,
      mockSetModal,
      mockSetLoading,
    );

    observer.error(new Error("Testing Error"));
    expect(mockSetModal).toBeCalledWith("Error", "Testing Error");
  });
  it("should call the provided functions when complete is called", () => {
    const mockElement = document.createElement("div");
    const mockSetSearchText = jest.fn();
    const mockChangeSearchBoxDisplay = jest.fn();
    const mockSetModal = jest.fn();
    const mockSetLoading = jest.fn();
    const observer = createSearchResultBoxObserver(
      mockElement,
      mockSetSearchText,
      mockSetModal,
      mockSetLoading,
    );

    observer.complete();
    expect(mockSetSearchText).not.toBeCalled();
    expect(mockChangeSearchBoxDisplay).not.toBeCalled();
    expect(mockSetModal).not.toBeCalled();
  });
});

describe("navbar createOutsideClickObserver test suite", () => {
  it("should call the provided functions when next is called", () => {
    const mockElement = document.createElement("div");
    const observer = createOutsideClickObserver(mockElement);

    observer.next();
    expect(mockElement).toHaveStyle({
      display: "none",
    });
  });
  it("should call the provided functions when error is called", () => {
    const mockElement = document.createElement("div");
    const observer = createOutsideClickObserver(mockElement);

    observer.error(new Error("Testing Error"));

    expect(console.error).toBeCalledWith(new Error("Testing Error"));
  });
  it("should call the provided functions when complete is called", () => {
    const mockElement = document.createElement("div");
    const observer = createOutsideClickObserver(mockElement);

    observer.complete();

    expect(console.log).toBeCalledWith("Observer Completed.");
  });
});
