import type { Folder as APIFolder } from "@bookshelf-client/api";
import {
  openFoldersAtom,
  updateOpenFoldersAtom,
} from "@bookshelf-client/store";
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import type { MouseEvent } from "react";
import { useState } from "react";
import { Bookmark } from "./bookmark";
import { BookmarksFolderIcon } from "./bookmarks-folder-icon";

const FOLDER_BASE_PATH = "";

type FolderProps = {
  folder: APIFolder;
  isOpen: boolean;
};

export function Folder({ folder, isOpen }: FolderProps) {
  const { bookmarks, folders } = folder;
  const [showDelete, setShowDelete] = useState<string | null>(folder.id);
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
          <BookmarksFolderIcon hasContents={hasContents} isOpen={isOpen} />
          <h3 className="text-bk-blue dark:text-bk-orange">{folder.name}</h3>
        </div>
      )}
      {isOpen && (
        <motion.ul key={folder.id} className="mx-4">
          {bookmarks &&
            bookmarks.map((b) => (
              <motion.li
                key={b.id}
                onHoverStart={() => {
                  setShowDelete(b.id);
                }}
                onHoverEnd={() => setShowDelete(null)}
              >
                <Bookmark bookmark={b} showDelete={showDelete} />
              </motion.li>
            ))}
          {folders &&
            folders.map((f) => {
              const currOpen = isFolderOpen[f.name];
              const isOpen = f.path
                .split(",")
                .filter((p) => p.length)
                .reduce((prev, curr) => prev && isFolderOpen[curr], currOpen);
              return (
                <motion.li key={f.id}>
                  <Folder folder={f} isOpen={isOpen} />
                </motion.li>
              );
            })}
        </motion.ul>
      )}
    </div>
  );
}
