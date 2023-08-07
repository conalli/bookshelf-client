import { atom } from "jotai";
import type { Bookmark } from "../utils/api/types";

export const selectedBookmarkAtom = atom<Bookmark | null>(null);
