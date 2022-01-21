import { TrashIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { Command, UpdateCommandStatus } from "../../../pages/dashboard";
import { User } from "../../hooks/useAuth";
import { useGetCmdData } from "../../hooks/useCmdData";
import StatusIcon from "./StatusIcon";

type CommandTableProps = {
  user: User | null;
  openModal: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<"add" | "del" | undefined>>;
  selected: Command | null;
  setSelected: Dispatch<SetStateAction<Command | null>>;
  cmdStatus: UpdateCommandStatus;
};

const CommandTable: React.FC<CommandTableProps> = ({
  user,
  openModal,
  setModalType,
  selected,
  setSelected,
  cmdStatus,
}) => {
  const { data } = useGetCmdData(
    user?.apiKey,
    () => console.log("Success!"),
    () => console.log("Error!")
  );
  if (!user) return null;
  const cmds = data?.data;

  return (
    <motion.table
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
        },
      }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full mt-6 lg:w-2/4 m-auto bg-white dark:bg-neutral-800 rounded shadow"
    >
      <thead className="text-left text-white bg-bk-blue dark:bg-bk-orange rounded-lg">
        <tr>
          <th className="text-xs md:text-smp-2">Command</th>
          <th className="text-xs md:text-smp-2">URL</th>
          <th className="text-xs md:text-smtext-center p-2">Status</th>
          <th className="text-xs md:text-smtext-center p-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {cmds &&
          Object.keys(cmds).map((key: string) => {
            return (
              <tr key={key}>
                <td className="text-xs md:text-smborder-r-2 border-r-bk-blue p-2">
                  {key}
                </td>
                <td className="text-xs md:text-smborder-r-2 border-r-bk-blue p-2">
                  <a href={cmds[key]}>{cmds[key]}</a>
                </td>
                <td className="text-xs md:text-smborder-r-2 border-r-bk-blue">
                  <div className="flex justify-center items-center w-full h-full">
                    <StatusIcon
                      key={key}
                      selected={selected}
                      cmdStatus={cmdStatus}
                    />
                  </div>
                </td>
                <td className="text-xs md:text-sm">
                  <button
                    onClick={() => {
                      setModalType("del");
                      setSelected({ cmd: key, url: cmds[key] });
                      openModal(true);
                    }}
                    className="flex justify-center items-center w-full"
                  >
                    <TrashIcon className="text-gray-400 w-4 h-6 lg:w-6 lg:h-8" />
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </motion.table>
  );
};

export default CommandTable;
