import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useGetBookmarks } from "../../hooks/useBookmarks";
import { addOpenFoldersAtom, foldersAtom } from "../../store/folders";
import { Folder as APIFolder } from "../../utils/APITypes";
import Folder from "./Folder";

const BookmarkTable = () => {
  const { user } = useAuth();
  const { data } = useGetBookmarks(user.id);
  const setFolders = useSetAtom(foldersAtom);
  const setOpenFolders = useSetAtom(addOpenFoldersAtom);

  useEffect(() => {
    setFolders(() => {
      if (!data) return {} as APIFolder;
      return data;
    });
    setOpenFolders();
  }, [setOpenFolders, data, setFolders]);

  return (
    <AnimatePresence mode="sync">
      <motion.div className="flex flex-col w-full mt-1 md:mt-1.5 lg:w-2/4 m-auto bg-white dark:bg-neutral-800 rounded shadow">
        {data && <Folder folder={data} isOpen={true} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default BookmarkTable;
