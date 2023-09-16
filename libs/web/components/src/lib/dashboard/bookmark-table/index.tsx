"use client";

import type { Folder as APIFolder } from "@bookshelf-client/api";
import { useMessages } from "@bookshelf-client/hooks";
import { addOpenFoldersAtom, foldersAtom } from "@bookshelf-client/store";
import { Spinner } from "@bookshelf-client/ui";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { BookmarksTable } from "./bookmark-table";
import { BookmarksTableMobile } from "./mobile";

type BookmarkTableProps = {
  folder: APIFolder | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function BookmarkTable({
  folder,
  isLoading,
  isError,
}: BookmarkTableProps) {
  const { addMessage } = useMessages();
  const setFolders = useSetAtom(foldersAtom);
  const setOpenFolders = useSetAtom(addOpenFoldersAtom);

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
    <div className="max-h-full max-w-full flex-col rounded pt-4 shadow sm:mx-0 sm:pb-2 md:py-1.5 md:pb-3 lg:w-2/3 lg:pb-6">
      {(isLoading || isError) && <Spinner key="spinner" />}
      {folder && (
        <BookmarksTableMobile key="folder" folder={folder} isOpen={true} />
      )}
      {folder && <BookmarksTable folder={folder} isError={isError} />}
    </div>
  );
}
