import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { User } from "../../../src/utils/api/types";
import { APIURL } from "../../../src/utils/api/endpoints";
import { Command, ModalType, UpdateCommandStatus } from "../../dashboard";
import CommandTable from "../../../src/components/CommandTable";
import { useDeleteCommand } from "../../../src/hooks/useCommands";
import Modal from "../../../src/components/Modal";
import DeleteCommandOverlay from "../../../src/components/Modal/DeleteCommandOverlay";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Command = ({ user }: { user: User }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const del = useDeleteCommand();
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
  useRefreshTokens();

  return (
    <div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalType === "delcmd" && (
          <DeleteCommandOverlay
            user={user}
            del={del}
            selected={selectedCommand}
            setIsOpen={setModalOpen}
          />
        )}
      </Modal>
      <CommandTable
        cmdStatus={updateStatus}
        user={user}
        commands={user.cmds}
        isLoadingCommands={false}
        openModal={setModalOpen}
        setModalType={setModalType}
        selected={selectedCommand}
        setSelected={setSelectedCommand}
      />
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const user = await axios.get<User, AxiosResponse<User, null>, null>(
      APIURL.USER,
      {
        withCredentials: true,
        headers: {
          Cookie: context.req?.headers.cookie,
        },
      }
    );
    return {
      props: { user: user.data },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
}

export default Command;
