import { ReactElement, useState } from "react";
import CommandTable from "../../src/components/CommandTable";
import Modal from "../../src/components/Modal";
import AddCommandOverlay from "../../src/components/Modal/AddCommandOverlay";
import DeleteCommandOverlay from "../../src/components/Modal/DeleteCommandOverlay";
import RouteGuard from "../../src/components/RouteGuard";
import { useAuth } from "../../src/hooks/useAuth";
import { useAddCmdData, useDelCmdData } from "../../src/hooks/useCmdData";
import { NextPageWithLayout } from "../_app";

export type Command = {
  cmd: string;
  url: string;
};

const Dashboard: NextPageWithLayout = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "del" | undefined>();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const { user, logOut } = useAuth();
  const add = useAddCmdData();
  const del = useDelCmdData();

  if (!user) return null;
  return (
    <>
      <h1>Dashboard</h1>
      <div className="">
        <button
          onClick={() => {
            setModalType("add");
            setModalOpen(true);
          }}
        >
          Add
        </button>
      </div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalType === "add" ? (
          <AddCommandOverlay user={user} add={add} setIsOpen={setModalOpen} />
        ) : (
          <DeleteCommandOverlay
            selected={selectedCommand || null}
            user={user}
            del={del}
            setIsOpen={setModalOpen}
          />
        )}
      </Modal>
      <CommandTable
        user={user}
        openModal={setModalOpen}
        setModalType={setModalType}
        setSelected={setSelectedCommand}
      />
      <button onClick={logOut}>Log out</button>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <RouteGuard>{page}</RouteGuard>;
};

export default Dashboard;
