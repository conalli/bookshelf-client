import { atom } from "jotai";
import { Bookmark } from "../utils/api/types";

export const selectedBookmarkAtom = atom<Bookmark | null>(null);
