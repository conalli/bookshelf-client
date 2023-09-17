import type { Bookmark as APIBookmark } from "@bookshelf-client/api";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { type MouseEvent } from "react";

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
    e.preventDefault();
    console.log("clicked", bookmark);
    isSelected ? selectBookmark(null) : selectBookmark(bookmark);
  };
  const styles =
    "hover:text-bk-blue dark:hover:text-bk-orange flex w-full justify-between truncate hover:cursor-pointer" +
    (isSelected ? "bg-neutral-700" : "");
  return (
    <div className={styles} onClick={bookmarkClickHandler}>
      <Link className="pl-2" href={bookmark.url}>
        {bookmark.name !== "" ? bookmark.name : bookmark.url}
      </Link>
      <button className="rounded-full hover:bg-neutral-700/90">
        <EllipsisVerticalIcon className="w-6 text-gray-400 " />
      </button>
    </div>
  );
}
