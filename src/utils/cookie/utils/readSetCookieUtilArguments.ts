import {
  CookieOptions,
  ResponseCookie,
  SetCookieUtilArguments,
} from "~/utils/cookie/types";

import { readCookieValue } from "./readCookieValue";

export const readSetCookieUtilArguments = (
  args: SetCookieUtilArguments
): CookieOptions => {
  if (typeof args[0] === "object") {
    return args[0];
  }

  const [name, value, options] = args;

  const cookieOptions: ResponseCookie = {
    name,
    value: readCookieValue(value),
    ...(options ?? {}),
  };

  return cookieOptions;
};
