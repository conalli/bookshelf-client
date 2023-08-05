import { auth } from "./auth";
import { user } from "./user";
import { bookmarks } from "./bookmarks";

export const handlers = [...auth, ...bookmarks, ...user];
