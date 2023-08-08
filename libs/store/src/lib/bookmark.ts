import { atom } from "jotai";
import type { Bookmark } from "../../../../libs/utils/src/lib/api/types";

export const selectedBookmarkAtom = atom<Bookmark | null>(null);
