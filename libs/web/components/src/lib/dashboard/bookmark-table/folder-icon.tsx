import {
  FolderIcon as FolderIconOutline,
  FolderMinusIcon as FolderMinusIconOutline,
  FolderPlusIcon as FolderPlusIconOutline,
} from "@heroicons/react/24/outline";
import { FolderMinusIcon as FolderMinusIconSolid } from "@heroicons/react/24/solid";

type BookmarksFolderIconProps = {
  hasContents: boolean;
  isOpen: boolean;
  isSelected: boolean;
};

export function FolderIcon({
  hasContents,
  isOpen,
  isSelected,
}: BookmarksFolderIconProps) {
  if (hasContents) {
    return isOpen && isSelected ? (
      <FolderMinusIconSolid className="h-4 w-4 text-gray-400 dark:text-gray-100 lg:h-5 lg:w-5" />
    ) : isOpen ? (
      <FolderMinusIconOutline className="h-4 w-4 text-gray-400 dark:text-gray-100 lg:h-5 lg:w-5" />
    ) : (
      <FolderPlusIconOutline className="h-4 w-4 text-gray-900 dark:text-gray-300 lg:h-5 lg:w-5" />
    );
  }

  return (
    <FolderIconOutline className="h-4 w-4 text-gray-400 dark:text-gray-300 lg:h-5 lg:w-5" />
  );
}
