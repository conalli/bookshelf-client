import { type Folder as APIFolder } from "@bookshelf-client/api";
import { type MouseEvent } from "react";
import { FolderIcon } from "./folder-icon";

const FOLDER_BASE_PATH = "";

type FolderProps = {
  folder: APIFolder;
  selectedFolder: APIFolder | null;
  setSelectedFolder: (
    e: MouseEvent<HTMLDivElement>,
    clickedFolder: APIFolder
  ) => void;
};

export function Folder({
  folder,
  selectedFolder,
  setSelectedFolder,
}: FolderProps) {
  const { folders } = folder;
  const selectFolder = (e: MouseEvent<HTMLDivElement>) =>
    setSelectedFolder(e, folder);
  const hasContents = folder.bookmarks ? folder.bookmarks.length > 0 : false;
  const selected =
    selectedFolder?.id === folder.id
      ? "text-bk-blue dark:text-bk-orange"
      : "text-bk-blue/90 dark:text-bk-orange/50";
  return (
    <div className="pb-0.5 pt-1">
      {folder.name !== FOLDER_BASE_PATH && (
        <div
          className={
            "flex items-center gap-2 truncate" +
            (hasContents ? "hover:cursor-pointer" : "")
          }
          onClick={selectFolder}
        >
          <FolderIcon
            hasContents={hasContents}
            isSelected={folder.id === selectedFolder?.id}
          />
          <h3 className={selected}>{folder.name}</h3>
        </div>
      )}
      <ul key={folder.id} className="mx-4">
        {folders &&
          folders.map((f) => {
            return (
              <li key={f.id}>
                <Folder
                  folder={f}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
