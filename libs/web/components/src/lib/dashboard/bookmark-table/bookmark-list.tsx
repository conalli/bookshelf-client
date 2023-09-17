import {
  type Bookmark as APIBookmark,
  type Folder as APIFolder,
} from "@bookshelf-client/api";
import { useState } from "react";
import { Bookmark } from "./bookmark";

export function BookmarkList({ folder }: { folder: APIFolder | null }) {
  const [selectedBookmark, setSelectedBookmark] = useState<APIBookmark | null>(
    null
  );
  const handleSelect = (b: APIBookmark | null) => {
    setSelectedBookmark(b);
  };
  if (!folder || !folder?.bookmarks) return null;
  const { bookmarks } = folder;
  return (
    <ul className="flex flex-col gap-1 p-2">
      {bookmarks.map((b) => (
        <li key={b.id}>
          <Bookmark
            bookmark={b}
            isSelected={selectedBookmark ? selectedBookmark.id === b.id : false}
            selectBookmark={handleSelect}
          />
        </li>
      ))}
    </ul>
  );
}
