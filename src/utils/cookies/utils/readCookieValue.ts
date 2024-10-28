import { Optional } from "@verdantkit/utils";

import { CookieValue } from "~/utils/cookies/types";

export const readCookieValue = (value: Optional<CookieValue>): string => {
  switch (typeof value) {
    case "undefined":
      return "";
    case "object":
      return JSON.stringify(value);
    default:
      return String(value);
  }
};
