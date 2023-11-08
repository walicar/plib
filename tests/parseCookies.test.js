import parseCookies from "../functions/util/parseCookies";
import { expect, test } from "vitest";

describe("Test parseCookie()", () => {
  test("Happy path", () => {
    var input = "UserKey=abc123; UserName=Daniel";
    var expected = { UserKey: "abc123", UserName: "Daniel" };
    expect(parseCookies(input)).toEqual(expected);
  });
});
