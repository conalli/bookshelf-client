import { ReactElement, useState } from "react";
import CommandTable from "../../src/components/CommandTable";
import Modal from "../../src/components/Modal";
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
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const { user, logOut } = useAuth();
  const add = useAddCmdData();
  const del = useDelCmdData();
  const [curr, setCurr] = useState(0);
  if (!user) return null;
  const list = [
    {
      id: user.id,
      cmd: "oa",
      url: "ok.com",
    },
    {
      id: user.id,
      cmd: "ob",
      url: "ok.com",
    },
    {
      id: user.id,
      cmd: "oc",
      url: "ok.com",
    },
    {
      id: user.id,
      cmd: "od",
      url: "ok.com",
    },
  ];
  return (
    <>
      <h1>Dashboard</h1>
      <div className="">
        <button
          onClick={() => {
            console.log(list[curr]);
            console.log(curr);
            add.mutate({
              apiKey: user.apiKey,
              body: list[curr],
            });
            setCurr(curr + 1);
          }}
        >
          Add
        </button>
      </div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        <DeleteCommandOverlay
          selected={selectedCommand || null}
          user={user}
          del={del}
        />
      </Modal>
      <CommandTable
        user={user}
        openModal={setModalOpen}
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
