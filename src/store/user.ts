import { atom } from "jotai";
import { User } from "../utils/api/types";

export const userAtom = atom<User | null>(null);
