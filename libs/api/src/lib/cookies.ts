import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const ACCESS_TOKEN = "bookshelf_access_token";
const CODE_TOKEN = "bookshelf_token_code";

export const getBookshelfCookies = (
  cookies: ReadonlyRequestCookies
): RequestCookie[] => {
  const access = cookies.get(ACCESS_TOKEN);
  const code = cookies.get(CODE_TOKEN);
  if (!access || !code) {
    throw new Error("No cookies in request");
  }
  return [access, code];
};

export const formatCookies = (cookies: RequestCookie[]): string => {
  return cookies.map((c) => `${c.name}=${c.value};`).join(" ");
};
