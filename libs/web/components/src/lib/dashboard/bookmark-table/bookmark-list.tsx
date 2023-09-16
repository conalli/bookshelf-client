import { type Folder as APIFolder } from "@bookshelf-client/api";
import { Bookmark } from "./bookmark";

export function BookmarkList({ folder }: { folder: APIFolder | null }) {
  if (!folder) return null;
  const { bookmarks } = folder;
  if (!bookmarks) return null;
  return (
    <div>
      {bookmarks.map((b) => (
        <Bookmark bookmark={b} showDelete={""} />
      ))}
    </div>
  );
}
