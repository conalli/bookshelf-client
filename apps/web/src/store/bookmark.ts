import type { Bookmark } from "@utils/api/types";
import { atom } from "jotai";

export const selectedBookmarkAtom = atom<Bookmark | null>(null);
