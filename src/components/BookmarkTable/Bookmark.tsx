import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { useSelectBookmark } from "../../hooks/useBookmarks";
import { useModal } from "../../hooks/useModal";
import { DELETE_BOOKMARK_MODAL } from "../../store/modal";
import { Bookmark as APIBookmark } from "../../utils/api/types";

type BookmarkProps = {
  showDelete: string | null;
  bookmark: APIBookmark;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark, showDelete }) => {
  const { setIsOpen, setModalType } = useModal();
  const { setSelectedBookmark } = useSelectBookmark();
  return (
    <motion.div className="truncate w-full hover:py-2">
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
            className="flex justify-center items-center w-full"
          >
            <TrashIcon className="text-red-400 hover:text-red-500 w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Bookmark;
