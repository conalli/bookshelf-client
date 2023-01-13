const base = process.env.NEXT_PUBLIC_API_BASE;

export const APIURL = {
  BASE: base,
  AUTH: base + "/auth",
  REFRESH: base + "/auth/refresh",
  USER: base + "/user",
  CMD: base + "/user/cmd",
  BOOKMARKS: base + "/bookmark",
  BOOKMARKSFILE: base + "/bookmark/file",
};

export const SearchURL = process.env.NEXT_PUBLIC_SEARCH;
