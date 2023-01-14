import { useState } from "react";
import CommandTable from "../../../src/components/CommandTable";
import Modal from "../../../src/components/Modal";
import DeleteCommandOverlay from "../../../src/components/Modal/DeleteCommandOverlay";
import {
  useDeleteCommand,
  useGetCommands,
  useSelectCommand,
} from "../../../src/hooks/useCommands";
import { useOpenModal } from "../../../src/hooks/useOpenModal";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";
import { useGetUser } from "../../../src/hooks/useUser";
import { getUserOrRedirect } from "../../../src/utils/api/props";
import { User } from "../../../src/utils/api/types";
import { ModalType, UpdateCommandStatus } from "../../dashboard";

export const getServerSideProps = getUserOrRedirect;

const Command = ({ userData }: { userData: User }) => {
  const [modalType, setModalType] = useState<ModalType>();
  const { data: user } = useGetUser(
    userData.api_key,
    {
      initialData: userData,
    },
    true
  );
  const { data: commands } = useGetCommands(userData.api_key);
  const del = useDeleteCommand();
  const { setIsOpen } = useOpenModal();
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
      <h1 className="text-4xl py-3">WebCLI Commands:</h1>
      <Modal>
        {modalType === "delcmd" && (
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
        setModalType={setModalType}
      />
    </div>
  );
};

export default Command;
