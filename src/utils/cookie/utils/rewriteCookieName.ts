import { camelCaseToN, noEmpty, regReplaceCallback } from "@verdantkit/utils";

import { applyCookieNamePatternAlternate } from "./applyCookieNamePatternAlternate";

export const rewriteCookieName = (cookieName: string): string => {
  const cookieNamePatternAlternates = [
    global.process.env.VERDANT_COOKIE_NAME,
    global.process.env.DATA_COOKIE_NAME,
    global.process.env.APP_COOKIE_NAME,
  ];

  const twoOrMoreSlashesRe = /-{2,}/;
  const nonAlphaNumericOrSlashCharRe = /([^a-zA-Z0-9-]+)/;

  cookieName = regReplaceCallback(
    nonAlphaNumericOrSlashCharRe,
    cookieName,
    () => "-"
  );
  cookieName = regReplaceCallback(twoOrMoreSlashesRe, cookieName, () => "-");
  cookieName = camelCaseToN(cookieName.replace(/((^-+)|(-+$))/g, ""), "-");

  for (const cookieNamePatternAlternate of cookieNamePatternAlternates) {
    if (noEmpty(cookieNamePatternAlternate)) {
      return applyCookieNamePatternAlternate(
        cookieNamePatternAlternate,
        cookieName
      );
    }
  }

  return applyCookieNamePatternAlternate("__SITE-DATA-$0", cookieName);
};
