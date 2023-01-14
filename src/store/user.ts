import { atom } from "jotai";
import { User } from "../utils/api/types";

export const userAtom = atom<User | null>(null);
export const removeUserAtom = atom<null, void>(null, (_get, set) =>
  set(userAtom, null)
);
