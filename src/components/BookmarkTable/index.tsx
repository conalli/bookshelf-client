import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { addOpenFoldersAtom, foldersAtom } from "../../store/folders";
import { Folder as APIFolder } from "../../utils/api/types";
import { createErrorMessage } from "../../utils/errors";
import Spinner from "../Spinner";
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
  const setFolders = useSetAtom(foldersAtom);
  const setOpenFolders = useSetAtom(addOpenFoldersAtom);
  const { setErrorMessages } = useAuth();

  useEffect(() => {
    setFolders(() => {
      if (!folder) return {} as APIFolder;
      return folder;
    });
    setOpenFolders();
  }, [setOpenFolders, folder, setFolders]);
  if (isError) {
    setErrorMessages((prev) => [
      ...prev,
      createErrorMessage("error getting bookmarks"),
    ]);
  }
  return (
    <AnimatePresence mode="sync">
      <motion.div className="flex flex-col w-full pt-4 pb-2 md:py-1.5 md:pb-3 lg:pb-6 lg:w-2/4 m-auto bg-white dark:bg-neutral-800 rounded shadow">
        {(isLoading || isError) && <Spinner />}
        {folder && <Folder folder={folder} isOpen={true} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default BookmarkTable;
