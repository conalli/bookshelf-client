import axios from "axios";
import { motion } from "framer-motion";
import { NextPageContext } from "next";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Provider as OpenFolderProvider } from "jotai";
import CommandTable from "../../src/components/CommandTable";
import MenuBar, { MenuOption } from "../../src/components/MenuBar";
import Modal from "../../src/components/Modal";
import AddCommandOverlay from "../../src/components/Modal/AddCommandOverlay";
import BrowserSetup from "../../src/components/BrowserSetup";
import DeleteCommandOverlay from "../../src/components/Modal/DeleteCommandOverlay";
import { useAuth } from "../../src/hooks/useAuth";
import {
  useAddCmdData,
  useDelCmdData,
  useGetCommands,
} from "../../src/hooks/useCommands";
import { APIURL } from "../../src/utils/APIEndpoints";
import { User } from "../../src/utils/APITypes";
import { NextPageWithLayoutAndProps } from "../_app";
import BookmarkTable from "../../src/components/BookmarkTable";
import {
  useAddBookmarkFromFile,
  useGetBookmarks,
} from "../../src/hooks/useBookmarks";
import RouteGuard from "../../src/components/RouteGuard";
import { useRefreshTokens } from "../../src/hooks/useRefreshTokens";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { USER_KEY, useUser } from "../../src/hooks/useUser";

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
    const prefetchUser = async () => {
      const res = await axios.get<User>(`${APIURL.base}/user`, {
        withCredentials: true,
        headers: {
          Cookie: context.req?.headers.cookie,
        },
      });
      return res.data;
    };
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery([USER_KEY], prefetchUser);
    return {
      props: { dehydratedState: dehydrate(queryClient) },
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "add" | "del" | "setup" | undefined
  >();
  const [menuOption, setMenuOption] = useState<MenuOption>("Commands");
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const { data: user } = useUser();
  const {
    user: { id: userID },
    setUser,
    logOut,
  } = useAuth();
  useEffect(() => {
    if (!user) {
      setUser(userData);
    }
  }, [setUser, user, userData]);

  const add = useAddCmdData(userID);
  const del = useDelCmdData(userID);
  const { data, isLoading } = useGetCommands(userID);
  const { data: folder } = useGetBookmarks(userID);
  const addBookmarkFile = useAddBookmarkFromFile(userID);
  const refreshTokenErrors = useRefreshTokens();
  if (refreshTokenErrors.length) {
    console.error(refreshTokenErrors);
  }

  const updateStatus: UpdateCommandStatus = {
    add: {
      success: add.isSuccess,
      loading: add.isLoading,
      error: add.isError,
    },
    del: {
      success: del.isSuccess,
      loading: del.isLoading,
      error: del.isError,
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
    formData.append("bookmarks_file", file, file.name);
    addBookmarkFile.mutate(formData);
  };

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
          {/* <button
            onClick={() => {
              setModalType("setup");
              setModalOpen(true);
            }}
            className="text-white px-4 py-2 bg-bk-orange rounded"
          >
            Setup Guide
          </button> */}
          {menuOption === "Commands" && (
            <button
              onClick={() => {
                setModalType("add");
                setModalOpen(true);
              }}
              className="text-white px-4 py-2 bg-green-500 dark:bg-gray-100 dark:text-neutral-600 rounded"
            >
              Add
            </button>
          )}
          {menuOption === "Bookmarks" && (
            <input accept=".html" onChange={handleSelectFile} type="file" />
          )}
          <button
            onClick={logOut}
            className="text-white px-4 py-2 bg-neutral-600 dark:bg-bk-blue rounded"
          >
            Log out
          </button>
        </div>
      </motion.div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalType === "add" ? (
          <AddCommandOverlay
            user={user}
            add={add}
            setSelected={setSelectedCommand}
            setIsOpen={setModalOpen}
          />
        ) : (
          <DeleteCommandOverlay
            selected={selectedCommand || null}
            user={user}
            del={del}
            setIsOpen={setModalOpen}
          />
        )}
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
            <BookmarkTable folder={folder} />
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

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <RouteGuard>{page}</RouteGuard>;
};

export default Dashboard;
