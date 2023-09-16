import { type Folder as APIFolder } from "@bookshelf-client/api";
import { Dispatch, SetStateAction } from "react";
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
  setSelectedFolder: Dispatch<SetStateAction<APIFolder | null>>;
}) {
  return (
    <ul>
      <Folder
        folder={folder}
        isOpen={isOpen}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
    </ul>
  );
}
