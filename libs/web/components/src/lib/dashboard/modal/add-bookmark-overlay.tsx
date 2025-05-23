"use client";

import type {
  AddBookmarkRequest,
  AddBookmarkResponse,
  ErrorResponse,
  Folder,
} from "@bookshelf-client/api";
import { Button } from "@bookshelf-client/ui/server";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState, type ChangeEvent, type SetStateAction } from "react";

type AddBookmarkOverlayProps = {
  folder: Folder | undefined;
  add: UseMutationResult<
    AddBookmarkResponse,
    AxiosError<ErrorResponse, AddBookmarkRequest>,
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

export function AddBookmarkOverlay({
  folder,
  add,
  setIsOpen,
}: AddBookmarkOverlayProps) {
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
      <div className="text-md py-2 md:text-xl lg:py-6">
        <div className="py-2">
          <div className="flex items-center gap-2">
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
            className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block w-full appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md focus:ring-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
            className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block w-full appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md focus:ring-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
            className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block w-full appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md focus:ring-4 disabled:bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:disabled:bg-neutral-800"
            disabled={isFolder}
            type="text"
            name="URL"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateData("URL", e)
            }
          />
        </div>
      </div>
      <div className="flex w-full gap-2 py-2 lg:py-4 ">
        <Button variant={"primary"} onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button
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
          variant={"add"}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
