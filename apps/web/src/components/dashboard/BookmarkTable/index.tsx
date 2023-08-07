import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { useMessages } from "../../../hooks";
import { addOpenFoldersAtom, foldersAtom } from "../../../store/folders";
import type { Folder as APIFolder } from "../../../utils/api/types";
import Spinner from "../../ui/Spinner";
import Folder from "./Folder";

type BookmarkTableProps = {
  folder: APIFolder | undefined;
  isLoading: boolean;
  isError: boolean;
};

const BookmarkTable: React.FC<BookmarkTableProps> = ({
  folder,
  isLoading,
  isError,
}) => {
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
    <motion.div className="max-h-full max-w-full flex-col rounded bg-white pt-4 shadow dark:bg-neutral-800 sm:mx-0 sm:pb-2 md:py-1.5 md:pb-3 lg:w-3/4 lg:pb-6">
      <AnimatePresence mode="sync">
        {(isLoading || isError) && <Spinner key="spinner" />}
        {folder && <Folder key="folder" folder={folder} isOpen={true} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookmarkTable;
