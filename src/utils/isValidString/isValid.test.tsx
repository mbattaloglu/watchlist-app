import isValid from "./isValid";

describe("isValid test suite", () => {
  it("should return true for valid string", () => {
    expect(isValid("valid string")).toBe(true);
  });
  it("should return false for invalid string", () => {
    expect(isValid("")).toBe(false);
  });
  it("should return false for only whitespace string", () => {
    expect(isValid("   ")).toBe(false);
  });
});
