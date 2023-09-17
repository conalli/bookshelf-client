import { type Folder as APIFolder } from "@bookshelf-client/api";
import { type MouseEvent } from "react";
import { Folder } from "./folder";

export function FolderList({
  folder,
  isOpen,
  selectedFolder,
  setSelectedFolder,
}: {
  folder: APIFolder;
  isOpen: boolean;
  selectedFolder: APIFolder | null;
  setSelectedFolder: (
    e: MouseEvent<HTMLDivElement>,
    clickedFolder: APIFolder
  ) => void;
}) {
  return (
    <ul>
      <li>
        <Folder
          folder={folder}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </li>
    </ul>
  );
}
