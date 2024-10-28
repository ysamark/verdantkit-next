import { Nullable } from "@verdantkit/utils";
import { cookies } from "next/headers";

import { SetCookieUtilArguments } from "./types";
import { readSetCookieUtilArguments } from "./utils/readSetCookieUtilArguments";
import { rewriteCookieName } from "./utils/rewriteCookieName";

export const getCookie = (cookieName: string): Nullable<string> => {
  const rewrittenCookieName = rewriteCookieName(cookieName);
  const cookieValue = cookies().get(rewrittenCookieName);

  return cookieValue?.value ?? null;
};

export const setCookie = (...args: SetCookieUtilArguments) => {
  const { name, value, options } = readSetCookieUtilArguments(args);

  const rewrittenCookieName = rewriteCookieName(name);
  const cookieData = cookies().set(rewrittenCookieName, value, options);

  return cookieData;
};
