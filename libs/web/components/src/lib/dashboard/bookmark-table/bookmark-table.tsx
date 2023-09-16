import { Folder as APIFolder } from "@bookshelf-client/api";
import { useMessages } from "@bookshelf-client/hooks";
import { addOpenFoldersAtom, foldersAtom } from "@bookshelf-client/store";
import { useSetAtom } from "jotai/react";
import { useEffect, useState } from "react";
import { BookmarkList } from "./bookmark-list";
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
  const [selectedFolder, setSelectedFolder] = useState<APIFolder | null>(null);

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
    <div className="hidden gap-4 sm:flex">
      <div className="rounded border bg-white dark:bg-neutral-800">
        <FolderList
          folder={folder}
          isOpen={true}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </div>
      <div className="rounded border bg-white dark:bg-neutral-800 ">
        <BookmarkList folder={selectedFolder} />
      </div>
    </div>
  );
}
