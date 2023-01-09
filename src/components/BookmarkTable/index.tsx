import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { addOpenFoldersAtom, foldersAtom } from "../../store/folders";
import { Folder as APIFolder } from "../../utils/APITypes";
import Folder from "./Folder";

type BookmarkTableProps = {
  folder: APIFolder | undefined;
};

const BookmarkTable: React.FC<BookmarkTableProps> = ({ folder }) => {
  const setFolders = useSetAtom(foldersAtom);
  const setOpenFolders = useSetAtom(addOpenFoldersAtom);

  useEffect(() => {
    setFolders(() => {
      if (!folder) return {} as APIFolder;
      return folder;
    });
    setOpenFolders();
  }, [setOpenFolders, folder, setFolders]);

  return (
    <AnimatePresence mode="sync">
      <motion.div className="flex flex-col w-full mt-1 md:mt-1.5 lg:w-2/4 m-auto bg-white dark:bg-neutral-800 rounded shadow">
        {folder && <Folder folder={folder} isOpen={true} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default BookmarkTable;
