import {
  FolderIcon,
  FolderMinusIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const BookmarksFolderIcon = ({
  hasContents,
  isOpen,
}: {
  hasContents: boolean;
  isOpen: boolean;
}) => {
  if (hasContents) {
    return isOpen ? (
      <FolderMinusIcon className="text-gray-400 dark:text-gray-300 w-2 h-2 md:w-3 md:h-3 lg:w-5 lg:h-5" />
    ) : (
      <FolderPlusIcon className="text-gray-900 dark:text-gray-100 w-2 h-2 md:w-3 md:h-3 lg:w-5 lg:h-5" />
    );
  }

  return (
    <FolderIcon className="text-gray-400 dark:text-gray-300 w-2 h-2 md:w-3 md:h-3 lg:w-5 lg:h-5" />
  );
};

export default BookmarksFolderIcon;
