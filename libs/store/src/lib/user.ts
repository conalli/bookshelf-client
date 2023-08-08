import { atom } from "jotai";
import type { User } from "../../../../libs/utils/src/lib/api/types";

export const userAtom = atom<User | null>(null);
export const removeUserAtom = atom(null, (_get, set) => set(userAtom, null));
