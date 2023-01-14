import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { ChangeEvent, SetStateAction, useState } from "react";
import {
  AddBookmarkRequest,
  AddBookmarkResponse,
  ErrorRes,
  Folder,
} from "../../utils/api/types";

type AddBookmarkOverlayProps = {
  folder: Folder | undefined;
  add: UseMutationResult<
    AddBookmarkResponse,
    AxiosError<ErrorRes, AddBookmarkRequest>,
    AddBookmarkRequest,
    unknown
  >;
  setIsOpen: (update: SetStateAction<boolean>) => void;
};

const generatePathOptions = (folder: Folder): string[] => {
  const findPathsBFS = (f: Folder) => {
    const paths: string[] = ["/"];
    const queue: [Folder, string][] = [[f, ""]];
    while (queue.length > 0) {
      const shifted = queue.shift();
      if (shifted) {
        const [currFolder, currPath] = shifted;
        if (!currFolder.folders) continue;
        if (currFolder.folders) {
          for (const fold of currFolder.folders) {
            const p = currPath + "/" + fold.name;
            paths.push(p);
            queue.push([fold, p]);
          }
        }
      }
    }
    return paths;
  };
  const paths = findPathsBFS(folder);
  return paths;
};

const sanitizePath = (path: string): string => {
  if (path === "/") return "";
  return path.replace("/", ",");
};

const AddBookmarkOverlay: React.FC<AddBookmarkOverlayProps> = ({
  folder,
  add,
  setIsOpen,
}) => {
  const [isFolder, setIsFolder] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const updateFolderData = () => {
    setIsFolder((prev) => !prev);
  };
  const updateData = (
    type: "folder" | "name" | "path" | "URL",
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (type === "folder") {
      const ok = e.target.value === "1";
      setIsFolder(ok);
      return;
    }
    if (type === "name") {
      setName(e.target.value);
      return;
    }
    if (type === "path") {
      setPath(e.target.value);
      return;
    }
    setUrl(e.target.value);
  };

  if (!folder) return null;

  return (
    <div className="flex flex-col p-3 lg:p-6">
      <h1 className="text-3xl">Add Bookmark: </h1>
      <div className="py-2 lg:py-6 text-md md:text-xl">
        <div className="py-2">
          <div className="flex gap-2 items-center">
            <label htmlFor="folder" className="py-2 pl-1">
              Folder:
            </label>
            <button
              id="folder"
              name="folder"
              value={isFolder ? "0" : "1"}
              onClick={updateFolderData}
            >
              {isFolder ? (
                <CheckIcon className="h-6 w-6 text-green-300 dark:bg-neutral-600" />
              ) : (
                <XMarkIcon className="h-6 w-6 text-red-500 dark:bg-neutral-600" />
              )}
            </button>
          </div>
          <label htmlFor="name" className="py-2 pl-1">
            {isFolder ? "Name:" : "Name (optional):"}
          </label>
          <input
            id="name"
            className="appearance-none bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-4 focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
            type="text"
            name="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateData("name", e)
            }
          />
        </div>
        <div className="py-2">
          <label htmlFor="path" className="py-2 pl-1">
            Path:
          </label>
          <select
            id="path"
            className="appearance-none bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-4 focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
            name="path"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              updateData("path", e)
            }
          >
            {generatePathOptions(folder).map((path) => (
              <option key={path} value={path}>
                {path}
              </option>
            ))}
          </select>
        </div>
        <div className="py-2">
          <label htmlFor="URL" className="py-2 pl-1">
            URL:
          </label>
          <input
            id="URL"
            className="appearance-none bg-gray-100 disabled:bg-white text-gray-900 text-sm rounded-lg focus:ring-4 focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:disabled:bg-neutral-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
            disabled={isFolder}
            type="text"
            name="URL"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateData("URL", e)
            }
          />
        </div>
      </div>
      <div className="flex gap-2 w-full py-2 lg:py-4 ">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(false)}
          className="bg-bk-blue dark:bg-bk-orange text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90 rounded shadow-md"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={
            name.length && url.length ? { scale: 1.05 } : { scale: 1 }
          }
          onClick={() => {
            add.mutate({
              name,
              path: sanitizePath(path),
              url,
              is_folder: isFolder,
            });
            setIsOpen(false);
          }}
          disabled={(!isFolder && !url.length) || (isFolder && !name.length)}
          className="bg-green-400 dark:bg-gray-100 dark:text-neutral-600 text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90  disabled:opacity-50 disabled:bg-gray-300 disabled:text-opacity-50 rounded shadow-md"
        >
          Add
        </motion.button>
      </div>
    </div>
  );
};

export default AddBookmarkOverlay;
