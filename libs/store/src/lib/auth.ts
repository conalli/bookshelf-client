import { atom } from "jotai";

export type AuthStatus = { success: boolean; loading: boolean; error: boolean };

export const statusAtom = atom<AuthStatus | null>({
  success: false,
  loading: false,
  error: false,
});
