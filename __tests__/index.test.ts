import * as React from "react";

describe("Hello", () => {
  it("should return hello world", () => {
    const result = "Hello World!";
    expect(result).toEqual("Hello World!");
  });
});

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      expect([1, 2, 3].indexOf(3)).toEqual(2);
    });
  });
});
