import giveColor from "./giveColor";

describe("give color test suite", () => {
  it("should return neutral when change is 0", () => {
    expect(giveColor(0)).toBe("neutral");
  });
  it("should return increment when change is positive", () => {
    expect(giveColor(1)).toBe("increment");
  });
  it("should return decrement when change is negative", () => {
    expect(giveColor(-1)).toBe("decrement");
  });
});
