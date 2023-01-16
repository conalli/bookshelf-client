import { atom } from "jotai";

export type Command = {
  cmd: string;
  url: string;
};

export const selectedCommandAtom = atom<Command | null>(null);
