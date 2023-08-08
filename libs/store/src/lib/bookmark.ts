import type { Bookmark } from "@bookshelf-client/utils";
import { atom } from "jotai";

export const selectedBookmarkAtom = atom<Bookmark | null>(null);
