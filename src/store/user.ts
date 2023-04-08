import type { User } from "@utils/api/types";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
export const removeUserAtom = atom(null, (_get, set) => set(userAtom, null));
