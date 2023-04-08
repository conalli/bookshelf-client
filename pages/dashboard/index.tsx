import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import Loading from "../../src/components/Loading";
import BookmarkTable from "../../src/components/dashboard/BookmarkTable";
import BrowserSetup from "../../src/components/dashboard/BrowserSetup";
import CommandTable from "../../src/components/dashboard/CommandTable";
import MenuBar, { MenuOption } from "../../src/components/dashboard/MenuBar";
import Modal from "../../src/components/dashboard/Modal";
import ModalOverlay from "../../src/components/dashboard/Modal/ModalOverlay";
import { useAuth } from "../../src/hooks/useAuth";
import {
  BOOKMARKS_FILE_FORM_KEY,
  useAddBookmark,
  useAddBookmarkFromFile,
  useGetBookmarks,
} from "../../src/hooks/useBookmarks";
import {
  useAddCommand,
  useDeleteCommand,
  useGetCommands,
} from "../../src/hooks/useCommands";
import { useModal } from "../../src/hooks/useModal";
import { useRefreshTokens } from "../../src/hooks/useRefreshTokens";
import { useGetUser } from "../../src/hooks/useUser";
import { ADD_BOOKMARK_MODAL, ADD_COMMAND_MODAL } from "../../src/store/modal";
import { getUserOrRedirect } from "../../src/utils/api/props";
import { User } from "../../src/utils/api/types";
import { NextPageWithLayoutAndProps } from "../_app";

export type UpdateCommandStatus = {
  add: {
    success: boolean;
    loading: boolean;
    error: boolean;
  };
  del: {
    success: boolean;
    loading: boolean;
    error: boolean;
  };
};

export const getServerSideProps = getUserOrRedirect;

const generateDisplayName = (user: User): string => {
  if (user.given_name) return user.given_name;
  if (user.name) return user.name;
  if (user.family_name) return user.family_name;
  return user.email.split("@")[0];
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

const Dashboard: NextPageWithLayoutAndProps<{ userData: User }> = ({
  userData,
}) => {
  const [menuOption, setMenuOption] = useState<MenuOption>("Commands");
  const { setIsOpen, setModalType } = useModal();
  const userKey = userData.api_key;
  const {
    status,
    setStatus,
    signOut: { mutate: signOut },
  } = useAuth();
  const { data: user } = useGetUser(userKey, {
    initialData: userData,
  });
  const addCommand = useAddCommand(userKey);
  const deleteCommand = useDeleteCommand(userKey);
  const { data, isLoading } = useGetCommands(userKey);
  const {
    data: folder,
    isLoading: isFolderLoading,
    isError: isFolderError,
  } = useGetBookmarks(userKey);
  const addBookmarkFile = useAddBookmarkFromFile(userKey);
  const addBookmark = useAddBookmark(userKey);
  useRefreshTokens(userKey);

  const updateStatus: UpdateCommandStatus = {
    add: {
      success: addCommand.isSuccess,
      loading: addCommand.isLoading,
      error: addCommand.isError,
    },
    del: {
      success: deleteCommand.isSuccess,
      loading: deleteCommand.isLoading,
      error: deleteCommand.isError,
    },
  };
  if (!user) return null;

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = createBookmarksFileFormData(e);
    if (!formData) return;
    addBookmarkFile.mutate(formData);
    e.target.files = null;
  };
  if (status && status.loading) return <Loading />;
  else setStatus(null);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
          },
        }}
        exit={{ opacity: 0, x: -20 }}
        className="flex justify-between py-2 lg:py-6"
      >
        <h1 className="text-1xl md:text-2xl lg:text-3xl">
          {generateDisplayName(user)}&apos;s Bookshelf:
        </h1>
        <div className="flex gap-0.5 md:gap-2">
          {menuOption === "Commands" && (
            <button
              onClick={() => {
                setModalType(ADD_COMMAND_MODAL);
                setIsOpen(true);
              }}
              className="rounded bg-green-500 px-4 py-2 text-white dark:bg-gray-100 dark:text-neutral-600"
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
                className="rounded bg-green-500 px-4 py-2 text-white dark:bg-gray-100 dark:text-neutral-600"
              >
                <div className="flex items-center justify-center gap-1">
                  <p className="mt-0.5">Add</p>
                  <PlusIcon className="h-5 w-5" />
                </div>
              </button>
              <input
                id="file-input"
                accept=".html"
                className=" m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-bk-blue transition ease-in-out
                focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                onChange={handleSelectFile}
                type="file"
              />
            </div>
          )}
          <button
            onClick={() => signOut()}
            className="h-max rounded bg-neutral-600 px-4 py-2.5 text-white dark:bg-bk-blue"
          >
            Log out
          </button>
        </div>
      </motion.div>
      <Modal>
        <ModalOverlay
          user={user}
          folder={folder}
          addCommand={addCommand}
          deleteCommand={deleteCommand}
          addBookmark={addBookmark}
        />
      </Modal>
      <div className="flex items-start justify-start">
        <MenuBar selected={menuOption} setSelected={setMenuOption} />
        {menuOption === "Commands" && (
          <CommandTable
            commands={data}
            isLoadingCommands={isLoading}
            user={user}
            cmdStatus={updateStatus}
          />
        )}
        {menuOption === "Bookmarks" && (
          <BookmarkTable
            folder={folder}
            isLoading={isFolderLoading || addBookmarkFile.isLoading}
            isError={isFolderError}
          />
        )}
        {menuOption === "Setup guide" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
              },
            }}
            exit={{ opacity: 0, x: -20 }}
            className="m-auto w-full rounded bg-white shadow dark:bg-neutral-800 lg:w-2/4"
          >
            <BrowserSetup />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
