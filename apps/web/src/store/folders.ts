import { atom } from "jotai";
import type { Folder } from "../utils/api/types";

export type FolderOpenState = { [name: string]: boolean };

export const foldersAtom = atom<Folder>({} as Folder);
export const openFoldersAtom = atom<FolderOpenState>({} as FolderOpenState);

const findAllFolders = (
  base: Folder,
  openFolders: FolderOpenState
): FolderOpenState => {
  if (!base.folders) return openFolders;
  const currFolders = base.folders.reduce((prev, curr) => {
    prev[curr.name] = true;
    return prev;
  }, {} as FolderOpenState);
  for (const f of base.folders) {
    openFolders = { ...openFolders, ...findAllFolders(f, openFolders) };
  }
  return { ...openFolders, ...currFolders };
};

export const addOpenFoldersAtom = atom(null, (get, set) => {
  const folder = get(foldersAtom);
  if (!folder.folders) return;
  const openFolders = findAllFolders(folder, {});
  set(openFoldersAtom, openFolders);
});

export const updateOpenFoldersAtom = atom(
  null,
  (get, set, name: keyof FolderOpenState) => {
    const openFolders = get(openFoldersAtom);
    const curr = openFolders[name];
    const currentlyOpenFolders = { ...openFolders, [name]: !curr };
    set(openFoldersAtom, currentlyOpenFolders);
  }
);
