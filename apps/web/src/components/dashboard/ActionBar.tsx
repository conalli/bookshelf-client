import { PlusIcon } from "@heroicons/react/24/solid";
import type { ChangeEvent } from "react";
import {
  BOOKMARKS_FILE_FORM_KEY,
  useAddBookmarkFromFile,
  useModal,
} from "../../hooks";
import { ADD_BOOKMARK_MODAL, ADD_COMMAND_MODAL } from "../../store/modal";
import type { MenuOption } from "./MenuBar";

type ActionBarProps = {
  menuOption: MenuOption;
  userKey: string;
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

function ActionBar({ menuOption, userKey }: ActionBarProps) {
  const { setIsOpen, setModalType } = useModal();
  const addBookmarkFile = useAddBookmarkFromFile(userKey);
  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = createBookmarksFileFormData(e);
    if (!formData) return;
    addBookmarkFile.mutate(formData);
    e.target.files = null;
  };
  return (
    <div className="flex w-full justify-end px-8 py-4 sm:pr-8">
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
            className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-2 py-1 text-base font-normal text-bk-blue transition ease-in-out
              focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            onChange={handleSelectFile}
            type="file"
          />
        </div>
      )}
    </div>
  );
}

export default ActionBar;
