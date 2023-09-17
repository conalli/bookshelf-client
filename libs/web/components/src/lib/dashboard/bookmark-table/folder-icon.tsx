import { FolderIcon as FolderIconOutline } from "@heroicons/react/24/outline";
import { FolderIcon as FolderIconSolid } from "@heroicons/react/24/solid";

type BookmarksFolderIconProps = {
  hasContents: boolean;
  isSelected: boolean;
};

export function FolderIcon({
  hasContents,
  isSelected,
}: BookmarksFolderIconProps) {
  if (hasContents) {
    return isSelected ? (
      <FolderIconSolid className="h-4 w-4 text-gray-400 dark:text-gray-100 lg:h-5 lg:w-5" />
    ) : (
      <FolderIconOutline className="h-4 w-4 text-gray-400 dark:text-gray-100 lg:h-5 lg:w-5" />
    );
  }

  return (
    <FolderIconOutline className="h-4 w-4 text-gray-300 dark:text-gray-500 lg:h-5 lg:w-5" />
  );
}
