"use client";

import type { Bookmark } from "@bookshelf-client/api";
import { atom } from "jotai";

export const selectedBookmarkAtom = atom<Bookmark | null>(null);
