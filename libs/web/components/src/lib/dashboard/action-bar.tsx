"use client";

import { User } from "@bookshelf-client/api";
import {
  BOOKMARKS_FILE_FORM_KEY,
  useAddBookmarkFromFile,
  useModal,
} from "@bookshelf-client/hooks";
import { ADD_BOOKMARK_MODAL, ADD_COMMAND_MODAL } from "@bookshelf-client/store";
import { PlusIcon } from "@heroicons/react/24/solid";
import type { ChangeEvent } from "react";
import type { MenuBarOption } from "./menu-bar-item";

type ActionBarProps = {
  menuOption: MenuBarOption;
  user: User;
};

const createBookmarksFileFormData = (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return null;
  const file = files.item(0);
  if (!file) return null;
  const formData = new FormData();
  formData.append(BOOKMARKS_FILE_FORM_KEY, file, file.name);
  return formData;
};

const generateDisplayName = (user: User): string => {
  if (user.given_name) return user.given_name;
  if (user.name) return user.name;
  if (user.family_name) return user.family_name;
  return user.email.split("@")[0];
};

export function ActionBar({ menuOption, user }: ActionBarProps) {
  const { setIsOpen, setModalType } = useModal();
  const addBookmarkFile = useAddBookmarkFromFile(user.api_key);
  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = createBookmarksFileFormData(e);
    if (!formData) return;
    addBookmarkFile.mutate(formData);
    e.target.files = null;
  };
  return (
    <div className="flex w-full items-center justify-end px-8 py-4 sm:pr-8">
      {menuOption === "Commands" && (
        <button
          onClick={() => {
            setModalType(ADD_COMMAND_MODAL);
            setIsOpen(true);
          }}
          className="rounded bg-green-500 px-2 py-1 text-white dark:bg-gray-100 dark:text-neutral-600 sm:px-4 sm:py-2"
        >
          <div className="flex items-center justify-center gap-1">
            <p className="mt-0.5">Add</p>
            <PlusIcon className="h-5 w-5" />
          </div>
        </button>
      )}
      {menuOption === "Bookmarks" && (
        <div className="flex gap-0.5 md:gap-2">
          <button
            onClick={() => {
              setModalType(ADD_BOOKMARK_MODAL);
              setIsOpen(true);
            }}
            className="rounded bg-green-500 px-2 py-1 text-white dark:bg-gray-100 dark:text-neutral-600 sm:px-4 sm:py-2"
          >
            <div className="flex items-center justify-center gap-1">
              <p className="mt-0.5">Add</p>
              <PlusIcon className="h-4 w-4" />
            </div>
          </button>
          <input
            id="file-input"
            accept=".html"
            className="text-bk-blue m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-2 py-1 text-base font-normal transition ease-in-out
              focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            onChange={handleSelectFile}
            type="file"
          />
        </div>
      )}
      <h1 className="decoration-bk-blue dark:decoration-bk-orange hidden pl-8 underline sm:flex sm:text-xl md:text-2xl lg:text-3xl">
        {generateDisplayName(user)}&apos;s Bookshelf
      </h1>
    </div>
  );
}
