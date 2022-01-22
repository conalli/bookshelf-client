import { motion } from "framer-motion";
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

const Dashboard: NextPageWithLayout = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "del" | undefined>();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const { user, logOut } = useAuth();
  const add = useAddCmdData();
  const del = useDelCmdData();

  const updateStatus: UpdateCommandStatus = {
    add: {
      success: add.isSuccess,
      loading: add.isLoading,
      error: add.isError,
    },
    del: {
      success: del.isSuccess,
      loading: del.isLoading,
      error: del.isError,
    },
  };

  if (!user) return null;
  return (
    <>
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
        className="flex justify-between py-2 lg:py-6"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl">
          {user.name}&apos;s Bookmarks:
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setModalType("add");
              setModalOpen(true);
            }}
            className="text-white px-4 py-2 bg-green-500 dark:bg-gray-100 dark:text-neutral-600 rounded"
          >
            Add
          </button>
          <button
            onClick={logOut}
            className="text-white px-4 py-2 bg-neutral-600 dark:bg-bk-blue rounded"
          >
            Log out
          </button>
        </div>
      </motion.div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        {modalType === "add" ? (
          <AddCommandOverlay
            user={user}
            add={add}
            setSelected={setSelectedCommand}
            setIsOpen={setModalOpen}
          />
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
        selected={selectedCommand}
        setSelected={setSelectedCommand}
        cmdStatus={updateStatus}
      />
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <RouteGuard>{page}</RouteGuard>;
};

export default Dashboard;
