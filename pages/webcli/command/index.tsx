import {
  CommandTable,
  DeleteCommandOverlay,
  Modal,
} from "@components/dashboard";
import {
  useDeleteCommand,
  useGetCommands,
  useGetUser,
  useModal,
  useRefreshTokens,
  useSelectCommand,
} from "@hooks";
import { DELETE_COMMAND_MODAL } from "@store/modal";
import { getUserOrRedirect } from "@utils/api/props";
import type { User } from "@utils/api/types";
import type { UpdateCommandStatus } from "../../dashboard";

export const getServerSideProps = getUserOrRedirect;

const Command = ({ userData }: { userData: User }) => {
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
};

export default Command;
