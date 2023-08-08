import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import type { Bookmark as APIBookmark } from "../../../../../../libs/utils/src/lib/api/types";
import { useModal, useSelectBookmark } from "../../../hooks";
import { DELETE_BOOKMARK_MODAL } from "../../../store/modal";

type BookmarkProps = {
  showDelete: string | null;
  bookmark: APIBookmark;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark, showDelete }) => {
  const { setIsOpen, setModalType } = useModal();
  const { setSelectedBookmark } = useSelectBookmark();
  return (
    <div className=" truncate">
      <div className="flex w-[200px] justify-between hover:text-bk-blue dark:hover:text-bk-orange sm:w-[350px] md:w-[400px]">
        <Link className="truncate pl-2" href={bookmark.url}>
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
    </div>
  );
};

export default Bookmark;
