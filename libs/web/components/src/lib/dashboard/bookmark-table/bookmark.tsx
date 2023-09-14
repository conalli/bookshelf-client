import type { Bookmark as APIBookmark } from "@bookshelf-client/api";
import { useModal, useSelectBookmark } from "@bookshelf-client/hooks";
import { DELETE_BOOKMARK_MODAL } from "@bookshelf-client/store";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type BookmarkProps = {
  showDelete: string | null;
  bookmark: APIBookmark;
};

export function Bookmark({ bookmark, showDelete }: BookmarkProps) {
  const { setIsOpen, setModalType } = useModal();
  const { setSelectedBookmark } = useSelectBookmark();
  return (
    <div className="truncate">
      <div className="hover:text-bk-blue dark:hover:text-bk-orange flex w-[200px] justify-between sm:w-[350px] md:w-[400px]">
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
}
