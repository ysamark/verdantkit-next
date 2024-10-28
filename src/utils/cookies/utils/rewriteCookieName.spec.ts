import { afterEach, describe, expect, it } from "vitest";

import { rewriteCookieName } from "./rewriteCookieName";

describe("Test rewriteCookieName util", () => {
  afterEach(() => {
    Object.assign(process.env, {
      VERDANT_COOKIE_NAME: "__HOST-DATA-APP-$0",
    });
  });

  it("should rewrite cookie name", () => {
    expect(rewriteCookieName("theme")).toBe("__SITE-DATA-Theme");
  });

  it("should rewrite secure cookie name", () => {
    expect(rewriteCookieName("userId")).toBe("__HOST-DATA-APP-User-id");
  });

  it("should rewrite secure cookie name #0", () => {
    expect(rewriteCookieName("UserNameWithTitle")).toBe(
      "__HOST-DATA-APP-User-name-with-title"
    );
  });

  it("should rewrite secure cookie name #1", () => {
    expect(rewriteCookieName("user name with title")).toBe(
      "__HOST-DATA-APP-User-name-with-title"
    );
  });

  it("should rewrite secure cookie name #2", () => {
    expect(rewriteCookieName("__user___name--with..--title")).toBe(
      "__HOST-DATA-APP-User-name-with-title"
    );
  });
});
