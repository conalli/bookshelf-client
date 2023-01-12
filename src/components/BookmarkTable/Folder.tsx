import { MouseEvent } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { openFoldersAtom, updateOpenFoldersAtom } from "../../store/folders";
import { motion } from "framer-motion";
import { Folder as APIFolder } from "../../utils/APITypes";
import Bookmark from "./Bookmark";
import BookmarksFolderIcon from "./BookmarksFolderIcon";

const FOLDER_BASE_PATH = "";

type FolderProps = {
  folder: APIFolder;
  isOpen: boolean;
};

const Folder: React.FC<FolderProps> = ({ folder, isOpen }) => {
  const { bookmarks, folders } = folder;
  const isFolderOpen = useAtomValue(openFoldersAtom);
  const setIsFolderOpen = useSetAtom(updateOpenFoldersAtom);
  const handleToggleFolder = (
    e: MouseEvent<HTMLLIElement>,
    name: string | number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFolderOpen(name);
  };

  const hasContents =
    (folder.bookmarks && folder.bookmarks.length > 0) ||
    (folder.folders !== null && folder.folders.length > 0);

  return (
    <div className="pt-1.5 pb-0.5">
      {folder.name !== FOLDER_BASE_PATH && (
        <div className="flex gap-2 truncate hover:cursor-pointer">
          <BookmarksFolderIcon hasContents={hasContents} isOpen={isOpen} />
          <h3 className="text-bk-blue dark:text-bk-orange">{folder.name}</h3>
        </div>
      )}
      {isOpen && (
        <motion.ul
          className="mx-4"
          layout
          variants={{
            open: {
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.5,
                staggerChildren: 0.1,
              },
            },
            closed: {
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          {bookmarks &&
            bookmarks.map((b) => (
              <motion.li
                key={b.id}
                variants={{
                  open: {
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.5,
                      staggerChildren: 0.1,
                    },
                  },
                  closed: {
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
              >
                <Bookmark bookmark={b} />
              </motion.li>
            ))}
          {folders &&
            folders.map((f) => {
              const currOpen = isFolderOpen[f.name];
              const isOpen = f.path
                .split(",")
                .filter((p) => p.length)
                .reduce((prev, curr) => prev && isFolderOpen[curr], currOpen);
              return (
                <motion.li
                  key={f.id}
                  variants={{
                    open: {
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.3,
                        staggerChildren: 0.05,
                      },
                    },
                    closed: {
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.3,
                      },
                    },
                  }}
                  onClick={(e) => handleToggleFolder(e, f.name)}
                >
                  <Folder folder={f} isOpen={isOpen} />
                </motion.li>
              );
            })}
        </motion.ul>
      )}
    </div>
  );
};

export default Folder;
