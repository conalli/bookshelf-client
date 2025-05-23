import { Folder as APIFolder } from "@bookshelf-client/api";
import { useMessages } from "@bookshelf-client/hooks";
import { addOpenFoldersAtom, foldersAtom } from "@bookshelf-client/store";
import { useSetAtom } from "jotai/react";
import { MouseEvent, useEffect, useState } from "react";
import { BookmarkList } from "./bookmark-list";
import { CurrentFolderBreadcrumbs } from "./current-folder-breadcrumbs";
import { FolderList } from "./folder-list";

export function BookmarksTable({
  folder,
  isError,
}: {
  folder: APIFolder;
  isError: boolean;
}) {
  const { addMessage } = useMessages();
  const setFolders = useSetAtom(foldersAtom);
  const setOpenFolders = useSetAtom(addOpenFoldersAtom);
  const [selectedFolder, setSelectedFolder] = useState<APIFolder>(folder);

  const handleSelectFolder = (
    e: MouseEvent<HTMLDivElement>,
    clickedFolder: APIFolder
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    selectedFolder.id === clickedFolder.id
      ? setSelectedFolder(folder)
      : setSelectedFolder(clickedFolder);
  };

  useEffect(() => {
    setFolders(() => {
      if (!folder) return {} as APIFolder;
      return folder;
    });
    setOpenFolders();
  }, [setOpenFolders, folder, setFolders]);
  if (isError) {
    addMessage("error getting bookmarks", true);
  }
  return (
    <div className="hidden gap-4 sm:flex sm:flex-col">
      <div>
        <CurrentFolderBreadcrumbs
          path={`${selectedFolder.path}${selectedFolder.name}`}
        />
      </div>
      <div className="flex min-w-full gap-4">
        <div className="border-bk-blue/20 min-w-[30%] rounded border bg-white dark:border-white/20 dark:bg-neutral-800">
          <FolderList
            folder={folder}
            isOpen={true}
            selectedFolder={selectedFolder}
            setSelectedFolder={handleSelectFolder}
          />
        </div>
        <div className="border-bk-blue/20 w-full rounded border bg-white dark:border-white/20 dark:bg-neutral-800 ">
          <BookmarkList folder={selectedFolder} />
        </div>
      </div>
    </div>
  );
}
