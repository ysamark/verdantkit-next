import { Nullable } from "@verdantkit/utils";
import { headers } from "next/headers";

import { CookieValue } from "~/utils/cookies/types";
import { readCookieValue } from "~/utils/cookies/utils";

export type HeaderValue = CookieValue;

export const getAllHeaders = () => {
  const allHeaders: Record<string, string> = {};

  headers().forEach((value, key) => {
    allHeaders[key] = value;
  });

  return allHeaders;
};

export const setHeader = (headerKey: string, headerValue: HeaderValue) => {
  return headers().set(headerKey, readCookieValue(headerValue));
};

export const getHeader = (headerKey: string): Nullable<string> => {
  let headerValue = null;

  headers().forEach((value, key) => {
    if (key.toLowerCase() === headerKey.toLowerCase()) {
      headerValue = value;
    }
  });

  return headerValue;
};

export const hasHeader = (headerKey: string): boolean => {
  const allHeadersKeys = Object.keys(getAllHeaders()).map((key) =>
    key.toLowerCase()
  );

  return allHeadersKeys.includes(headerKey.toLowerCase());
};
