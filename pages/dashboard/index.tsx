import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { motion } from "framer-motion";
import { Provider as OpenFolderProvider } from "jotai";
import { NextPageContext } from "next";
import { ChangeEvent, useState } from "react";
import BookmarkTable from "../../src/components/BookmarkTable";
import BrowserSetup from "../../src/components/BrowserSetup";
import CommandTable from "../../src/components/CommandTable";
import Loading from "../../src/components/Loading";
import MenuBar, { MenuOption } from "../../src/components/MenuBar";
import Modal from "../../src/components/Modal";
import ModalOverlay from "../../src/components/Modal/ModalOverlay";
import { useAuth, useAuthStatus } from "../../src/hooks/useAuth";
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
import { useRefreshTokens } from "../../src/hooks/useRefreshTokens";
import { useGetUser } from "../../src/hooks/useUser";
import { APIURL } from "../../src/utils/api/endpoints";
import { User } from "../../src/utils/api/types";
import { NextPageWithLayoutAndProps } from "../_app";

export type ModalType =
  | "addcmd"
  | "addbookmark"
  | "delcmd"
  | "setup"
  | undefined;

export type Command = {
  cmd: string;
  url: string;
};

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

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const { data } = await axios.get<User>(APIURL.USER, {
      withCredentials: true,
      headers: {
        Cookie: context.req?.headers.cookie,
      },
    });
    return {
      props: { userData: data },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
};

const Dashboard: NextPageWithLayoutAndProps<{ userData: User }> = ({
  userData,
}) => {
  console.log("userDATA", userData);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [menuOption, setMenuOption] = useState<MenuOption>("Commands");
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const {
    signOut: { mutate: signOut },
  } = useAuth();
  const status = useAuthStatus();
  const { data: user } = useGetUser(userData.api_key, {
    initialData: userData,
  });
  const addCommand = useAddCommand(userData.api_key);
  const deleteCommand = useDeleteCommand(userData.api_key);
  const { data, isLoading } = useGetCommands(userData.api_key);
  const {
    data: folder,
    isLoading: isFolderLoading,
    isError: isFolderError,
  } = useGetBookmarks(userData.api_key);
  const addBookmarkFile = useAddBookmarkFromFile(userData.api_key);
  const addBookmark = useAddBookmark(userData.api_key);
  useRefreshTokens(userData.api_key);

  const handleLogout = () => {
    signOut();
  };
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
  const generateDisplayName = (user: User): string => {
    if (user.given_name) return user.given_name;
    if (user.name) return user.name;
    if (user.family_name) return user.family_name;
    return user.email.split("@")[0];
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files.item(0);
    if (!file) return;
    const formData = new FormData();
    formData.append(BOOKMARKS_FILE_FORM_KEY, file, file.name);
    addBookmarkFile.mutate(formData);
    e.target.files = null;
  };
  if (!status) return <Loading />;
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
                setModalType("addcmd");
                setModalOpen(true);
              }}
              className="text-white px-4 py-2 bg-green-500 dark:bg-gray-100 dark:text-neutral-600 rounded"
            >
              <div className="flex gap-1 justify-center items-center">
                <p className="mt-0.5">Add</p>
                <PlusIcon className="w-5 h-5" />
              </div>
            </button>
          )}
          {menuOption === "Bookmarks" && (
            <div className="flex gap-0.5 md:gap-2">
              <button
                onClick={() => {
                  setModalType("addbookmark");
                  setModalOpen(true);
                }}
                className="text-white px-4 py-2 bg-green-500 dark:bg-gray-100 dark:text-neutral-600 rounded"
              >
                <div className="flex gap-1 justify-center items-center">
                  <p className="mt-0.5">Add</p>
                  <PlusIcon className="w-5 h-5" />
                </div>
              </button>
              <input
                id="file-input"
                accept=".html"
                className=" block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding text-bk-blue border border-solid border-gray-300 rounded transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                onChange={handleSelectFile}
                type="file"
              />
            </div>
          )}
          <button
            onClick={handleLogout}
            className="h-max text-white px-4 py-2.5 bg-neutral-600 dark:bg-bk-blue rounded"
          >
            Log out
          </button>
        </div>
      </motion.div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <ModalOverlay
          user={user}
          folder={folder}
          addCommand={addCommand}
          deleteCommand={deleteCommand}
          addBookmark={addBookmark}
          selectedCommand={selectedCommand}
          setSelectedCommand={setSelectedCommand}
          modalType={modalType}
          setModalOpen={setModalOpen}
        />
      </Modal>
      <div className="flex justify-start items-start">
        <MenuBar selected={menuOption} setSelected={setMenuOption} />
        {menuOption === "Commands" && (
          <CommandTable
            commands={data}
            isLoadingCommands={isLoading}
            user={user}
            openModal={setModalOpen}
            setModalType={setModalType}
            selected={selectedCommand}
            setSelected={setSelectedCommand}
            cmdStatus={updateStatus}
          />
        )}
        {menuOption === "Bookmarks" && (
          <OpenFolderProvider>
            <BookmarkTable
              folder={folder}
              isLoading={isFolderLoading || addBookmarkFile.isLoading}
              isError={isFolderError}
            />
          </OpenFolderProvider>
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
            className="w-full m-auto lg:w-2/4 bg-white dark:bg-neutral-800 rounded shadow"
          >
            <BrowserSetup />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
