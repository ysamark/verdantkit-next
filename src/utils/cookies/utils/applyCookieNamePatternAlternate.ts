import { capitalizeWords } from "@verdantkit/utils";

import { cookieNameConfig } from "./cookieNameConfig";

export const applyCookieNamePatternAlternate = (
  cookieNamePatternAlternate: string,
  cookieName: string
): string => {
  const rewrittenCookieName = cookieNamePatternAlternate.replace(
    "$0",
    capitalizeWords(cookieName).replace(/\s+/g, "-")
  );

  return cookieNameConfig.prefix.concat(rewrittenCookieName);
};
