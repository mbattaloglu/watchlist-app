import changeDisplayStatus from "./changeDisplayStatus";

describe("changeDisplayStatus util func test suite", () => {
  it("should change display status of element", () => {
    const element = document.createElement("div");
    element.style.display = "block";
    changeDisplayStatus(element, "none");
    expect(element.style.display).toBe("none");
  });
  it("should change display status of element", () => {
    const element = null;

    expect(() => changeDisplayStatus(element, "block")).toThrowError(
      new Error("Element not found"),
    );
  });
});
