import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { User } from "../../../src/utils/APITypes";
import { ReqURL } from "../../../src/utils/APIEndpoints";
import { Command, UpdateCommandStatus } from "../../dashboard";
import CommandTable from "../../../src/components/CommandTable";
import { useDelCmdData } from "../../../src/hooks/useCommands";
import Modal from "../../../src/components/Modal";
import DeleteCommandOverlay from "../../../src/components/Modal/DeleteCommandOverlay";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Command = ({ user }: { user: User }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    "add" | "del" | "setup" | undefined
  >();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const del = useDelCmdData(user.id);
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
  const refreshErrors = useRefreshTokens();
  if (refreshErrors.length) {
    console.error(...refreshErrors);
  }
  return (
    <div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalType === "del" && (
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
      ReqURL.base + "/user",
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
