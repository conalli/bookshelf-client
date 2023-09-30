import type { Bookmark as APIBookmark } from "@bookshelf-client/api";
import { LinkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { type MouseEvent } from "react";
import { BookmarkDropdown } from "./bookmark-dropdown";

type BookmarkProps = {
  bookmark: APIBookmark;
  isSelected: boolean;
  selectBookmark: (b: APIBookmark | null) => void;
};

export function Bookmark({
  bookmark,
  isSelected,
  selectBookmark,
}: BookmarkProps) {
  const bookmarkClickHandler = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    isSelected ? selectBookmark(null) : selectBookmark(bookmark);
  };
  const styles =
    "hover:text-bk-blue dark:hover:text-bk-orange flex truncate hover:cursor-pointer" +
    (isSelected ? "bg-neutral-700 text-bk-blue dark:text-bk-orange" : "");
  return (
    <div className="flex justify-between" onClick={bookmarkClickHandler}>
      <div className={styles}>
        <p className="max-w-[30ch] truncate">
          {bookmark.name !== "" ? bookmark.name : bookmark.url}
        </p>
        {isSelected && (
          <Link
            className="text-bk-red inline-flex justify-center gap-1 pl-2 underline"
            href={bookmark.url}
          >
            {bookmark.url}
            <LinkIcon width={16} height={16} />
          </Link>
        )}
      </div>
      <BookmarkDropdown />
    </div>
  );
}
