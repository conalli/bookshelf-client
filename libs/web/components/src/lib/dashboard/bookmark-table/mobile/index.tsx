import { type Folder as APIFolder } from "@bookshelf-client/api";
import { Folder } from "./folder";

type BookmarksTableMobileProps = {
  folder: APIFolder;
  isOpen: boolean;
};

export function BookmarksTableMobile({
  folder,
  isOpen,
}: BookmarksTableMobileProps) {
  return (
    <div className="sm:hidden">
      <Folder folder={folder} isOpen={isOpen} />
    </div>
  );
}
