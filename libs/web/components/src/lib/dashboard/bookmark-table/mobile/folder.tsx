import type { Folder as APIFolder } from "@bookshelf-client/api";
import {
  openFoldersAtom,
  updateOpenFoldersAtom,
} from "@bookshelf-client/store";
import { useAtomValue, useSetAtom } from "jotai";
import type { MouseEvent } from "react";
import { FolderIcon } from "../folder-icon";
import { Bookmark } from "./bookmark";

const FOLDER_BASE_PATH = "";

type FolderProps = {
  folder: APIFolder;
  isOpen: boolean;
};

export function Folder({ folder, isOpen }: FolderProps) {
  const { bookmarks, folders } = folder;
  const isFolderOpen = useAtomValue(openFoldersAtom);
  const setIsFolderOpen = useSetAtom(updateOpenFoldersAtom);
  const handleToggleFolder = (
    e: MouseEvent<HTMLDivElement>,
    name: string | number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFolderOpen(name);
  };

  const hasContents =
    (folder.bookmarks && folder.bookmarks.length > 0) ||
    (folder.folders !== null && folder.folders.length > 0);

  return (
    <div className="pb-0.5 pt-1">
      {folder.name !== FOLDER_BASE_PATH && (
        <div
          className="flex items-center gap-2 truncate hover:cursor-pointer"
          onClick={(e) => handleToggleFolder(e, folder.name)}
        >
          <FolderIcon hasContents={hasContents} isSelected={false} />
          <h3 className="text-bk-blue dark:text-bk-orange">{folder.name}</h3>
        </div>
      )}
      {isOpen && (
        <ul key={folder.id} className="mx-4">
          {bookmarks &&
            bookmarks.map((b) => (
              <li key={b.id}>
                <Bookmark
                  bookmark={b}
                  selectBookmark={(_b) => {
                    return;
                  }}
                  isSelected={false}
                />
              </li>
            ))}
          {folders &&
            folders.map((f) => {
              const currOpen = isFolderOpen[f.name];
              const isOpen = f.path
                .split(",")
                .filter((p) => p.length)
                .reduce((prev, curr) => prev && isFolderOpen[curr], currOpen);
              return (
                <li key={f.id}>
                  <Folder folder={f} isOpen={isOpen} />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
