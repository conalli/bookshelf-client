"use client";

import { atom } from "jotai";

export const ADD_COMMAND_MODAL = "addCommand";
export const DELETE_COMMAND_MODAL = "deleteCommand";
export const ADD_BOOKMARK_MODAL = "addBookmark";
export const DELETE_BOOKMARK_MODAL = "deleteBookmark";

export type ModalType =
  | "addCommand"
  | "deleteCommand"
  | "addBookmark"
  | "deleteBookmark"
  | null;

export const modalOpenAtom = atom(false);
export const modalTypeAtom = atom<ModalType>(null);
