"use client";

import {
  useDeleteCommand,
  useGetCommands,
  useGetUser,
  useModal,
  useRefreshTokens,
  useSelectCommand,
} from "@bookshelf-client/hooks";
import { DELETE_COMMAND_MODAL } from "@bookshelf-client/store";
import type { UpdateCommandStatus, User } from "@bookshelf-client/utils";
import { getUserOrRedirect } from "@bookshelf-client/utils";
import {
  CommandTable,
  DeleteCommandOverlay,
  Modal,
} from "@bookshelf-client/web/components";

export const getServerSideProps = getUserOrRedirect;

type CommandProps = {
  userData: User;
};

export default function Command({ userData }: CommandProps) {
  const { data: user } = useGetUser(
    userData.api_key,
    {
      initialData: userData,
    },
    true
  );
  const { data: commands } = useGetCommands(userData.api_key);
  const del = useDeleteCommand();
  const { setIsOpen, modalType } = useModal();
  const { selectedCommand } = useSelectCommand();
  const updateStatus: UpdateCommandStatus = {
    add: {
      success: false,
      loading: false,
      error: false,
    },
    del: {
      success: del.isSuccess,
      loading: del.isLoading,
      error: del.isError,
    },
  };
  useRefreshTokens(userData.api_key);

  return (
    <div className="w-full px-8">
      <h1 className="py-3 text-4xl">WebCLI Commands:</h1>
      <Modal>
        {modalType === DELETE_COMMAND_MODAL && (
          <DeleteCommandOverlay
            user={user ? user : userData}
            del={del}
            selected={selectedCommand}
            setIsOpen={setIsOpen}
          />
        )}
      </Modal>
      <CommandTable
        cmdStatus={updateStatus}
        user={user ? user : userData}
        commands={commands}
        isLoadingCommands={false}
      />
    </div>
  );
}
