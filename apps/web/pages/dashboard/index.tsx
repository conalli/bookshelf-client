import { motion } from "framer-motion";
import { useState } from "react";
import type { MenuOption } from "../../src/components/dashboard";
import {
  BookmarkTable,
  BrowserSetup,
  CommandTable,
  MenuBar,
  Modal,
  ModalOverlay,
} from "../../src/components/dashboard";
import ActionBar from "../../src/components/dashboard/ActionBar";
import { Loading } from "../../src/components/ui";
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
} from "../../src/hooks";
import { getUserOrRedirect } from "../../src/utils/api/props";
import type { User } from "../../src/utils/api/types";
import type { NextPageWithLayoutAndProps } from "../_app";

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

const Dashboard: NextPageWithLayoutAndProps<{ userData: User }> = ({
  userData,
}) => {
  const [menuOption, setMenuOption] = useState<MenuOption>("Commands");
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
    <section className="flex min-h-full grow flex-col px-8 sm:flex-row">
      <section className="w-full sm:min-h-full sm:w-1/4">
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
