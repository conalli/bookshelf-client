"use client";

import type { User } from "@bookshelf-client/api";
import {
  useAddBookmark,
  useAddBookmarkFromFile,
  useAddCommand,
  useAuth,
  useDeleteCommand,
  useGetBookmarks,
  useGetCommands,
  useGetUser,
  useRefreshTokens,
} from "@bookshelf-client/hooks";
import { Loading } from "@bookshelf-client/ui";
import type { UpdateCommandStatus } from "@bookshelf-client/utils";
import type { MenuBarOption } from "@bookshelf-client/web/components";
import {
  ActionBar,
  BookmarkTable,
  BrowserSetup,
  CommandTable,
  MenuBar,
  Modal,
  ModalOverlay,
} from "@bookshelf-client/web/components";
import { motion } from "framer-motion";
import { useState } from "react";

const Dashboard = ({ userData }: { userData: User }) => {
  const [menuOption, setMenuOption] = useState<MenuBarOption>("Commands");
  const userKey = userData.api_key;
  const { status, setStatus } = useAuth();
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
  if (status && status.loading) return <Loading isPage />;
  else setStatus(null);
  return (
    <section className="flex min-h-full grow flex-col sm:flex-row">
      <section className="w-full sm:min-h-full sm:w-24">
        <MenuBar
          selected={menuOption}
          setSelected={setMenuOption}
          user={user}
        />
      </section>
      <section className="flex min-h-full w-full flex-col items-center sm:w-3/4 sm:gap-4">
        <ActionBar menuOption={menuOption} userKey={userKey} />
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
        {menuOption === "Setup" && (
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
            className="mx-auto w-full rounded px-8 shadow sm:bg-white sm:dark:bg-neutral-800 lg:w-2/4"
          >
            <BrowserSetup />
          </motion.div>
        )}
      </section>
      <Modal>
        <ModalOverlay
          user={user}
          folder={folder}
          addCommand={addCommand}
          deleteCommand={deleteCommand}
          addBookmark={addBookmark}
        />
      </Modal>
    </section>
  );
};

export default Dashboard;
