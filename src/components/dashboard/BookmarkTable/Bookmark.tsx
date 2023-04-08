import { TrashIcon } from "@heroicons/react/24/outline";
import { useModal, useSelectBookmark } from "@hooks";
import { DELETE_BOOKMARK_MODAL } from "@store/modal";
import type { Bookmark as APIBookmark } from "@utils/api/types";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type BookmarkProps = {
  showDelete: string | null;
  bookmark: APIBookmark;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark, showDelete }) => {
  const { setIsOpen, setModalType } = useModal();
  const { setSelectedBookmark } = useSelectBookmark();
  return (
    <motion.div className="w-full truncate hover:py-2">
      <div className="flex justify-between">
        <Link className="ml-2" href={bookmark.url}>
          {bookmark.name !== "" ? bookmark.name : bookmark.url}
        </Link>
        {showDelete && showDelete === bookmark.id && (
          <button
            onClick={() => {
              setModalType(DELETE_BOOKMARK_MODAL);
              setSelectedBookmark(bookmark);
              setIsOpen(true);
            }}
            className="flex w-full items-center justify-center"
          >
            <TrashIcon className="h-4 w-4 text-red-400 hover:text-red-500" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Bookmark;
