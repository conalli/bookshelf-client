import { atom } from "jotai";
import { Command } from "../../pages/dashboard";

export const selectedCommandAtom = atom<Command | null>(null);
