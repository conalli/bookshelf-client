import {
  FolderIcon,
  FolderMinusIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";

type BookmarksFolderIconProps = {
  hasContents: boolean;
  isOpen: boolean;
};

export function BookmarksFolderIcon({
  hasContents,
  isOpen,
}: BookmarksFolderIconProps) {
  if (hasContents) {
    return isOpen ? (
      <FolderMinusIcon className="h-4 w-4 text-gray-400 dark:text-gray-300 lg:h-5 lg:w-5" />
    ) : (
      <FolderPlusIcon className="h-4 w-4 text-gray-900 dark:text-gray-100 lg:h-5 lg:w-5" />
    );
  }

  return (
    <FolderIcon className="h-4 w-4 text-gray-400 dark:text-gray-300 lg:h-5 lg:w-5" />
  );
}
