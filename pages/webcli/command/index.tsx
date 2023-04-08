import CommandTable from "../../../src/components/dashboard/CommandTable";
import Modal from "../../../src/components/dashboard/Modal";
import DeleteCommandOverlay from "../../../src/components/dashboard/Modal/DeleteCommandOverlay";
import {
  useDeleteCommand,
  useGetCommands,
  useSelectCommand,
} from "../../../src/hooks/useCommands";
import { useModal } from "../../../src/hooks/useModal";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";
import { useGetUser } from "../../../src/hooks/useUser";
import { DELETE_COMMAND_MODAL } from "../../../src/store/modal";
import { getUserOrRedirect } from "../../../src/utils/api/props";
import { User } from "../../../src/utils/api/types";
import { UpdateCommandStatus } from "../../dashboard";

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
    <div>
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
