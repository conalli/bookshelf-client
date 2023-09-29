import { type Folder as APIFolder } from "@bookshelf-client/api";
import { cva, type VariantProps } from "class-variance-authority";
import { type MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import { FolderIcon } from "./folder-icon";

const FOLDER_BASE_PATH = "";

const folderVariants = cva("", {
  variants: {
    variant: {
      hasContents: "hover:cursor-pointer",
      isEmpty: "hover:cursor-default",
    },
    selected: {
      true: "text-bk-blue dark:text-bk-orange",
      false: "text-bk-blue/90 dark:text-bk-orange/50",
    },
  },
  defaultVariants: {
    variant: "isEmpty",
    selected: false,
  },
});

type FolderVariants = VariantProps<typeof folderVariants>;

type FolderProps = {
  folder: APIFolder;
  selectedFolder: APIFolder | null;
  setSelectedFolder: (
    e: MouseEvent<HTMLDivElement>,
    clickedFolder: APIFolder
  ) => void;
} & FolderVariants;

export function Folder({
  folder,
  selectedFolder,
  setSelectedFolder,
  variant,
  selected,
}: FolderProps) {
  const { folders } = folder;
  const selectFolder = (e: MouseEvent<HTMLDivElement>, hasContents: boolean) =>
    hasContents && setSelectedFolder(e, folder);
  const hasContents = folder.bookmarks ? folder.bookmarks.length > 0 : false;
  return (
    <div className="pb-0.5 pt-1">
      {folder.name !== FOLDER_BASE_PATH && (
        <div
          className={"flex items-center gap-2 truncate"}
          onClick={(e) => selectFolder(e, hasContents)}
        >
          <FolderIcon
            hasContents={hasContents}
            isSelected={folder.id === selectedFolder?.id}
          />
          <h3 className={twMerge(folderVariants({ variant, selected }))}>
            {folder.name}
          </h3>
        </div>
      )}
      <ul key={folder.id} className="mx-4">
        {folders &&
          folders.map((f) => {
            const hasContents =
              (f.bookmarks && f.bookmarks.length > 0) ||
              (f.folders && f.folders.length > 0);
            return (
              <li key={f.id}>
                <Folder
                  folder={f}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                  variant={hasContents ? "hasContents" : "isEmpty"}
                  selected={selectedFolder?.id === f.id}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
