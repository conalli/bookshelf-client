import { WEB_URL } from "./extension-utils";

describe("extensionUtils", () => {
  it("should work", () => {
    expect(WEB_URL).toEqual("http://localhost:3000");
  });
});
