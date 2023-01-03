import { TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { Command, UpdateCommandStatus } from "../../../pages/dashboard";
import { User } from "../../utils/APITypes";
import { useGetCmdData } from "../../hooks/useCmdData";
import CommandPlaceholder from "./CommandPlaceholder";
import StatusIcon from "./StatusIcon";

type CommandTableProps = {
  user: User | null;
  openModal: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<"add" | "del" | "setup" | undefined>>;
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
  const { data, isLoading } = useGetCmdData();
  if (!user) return null;

  const cmds = data?.data;
  const formatLink = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      return link;
    }
    return `http://${link}`;
  };
  // Refactor logic?
  if (cmds && Object.keys(cmds).length === 0) {
    return (
      <div className="w-full mt-6 lg:w-2/4 m-auto text-3xl text-center pt-10">
        Add your commands here.
      </div>
    );
  } else if (isLoading || !cmds) {
    return (
      <div className="w-full lg:w-2/4 m-auto text-3xl text-center pt-10">
        <CommandPlaceholder />
      </div>
    );
  } else
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
            <th className="text-xs md:text-sm lg:text-base  p-2">Command</th>
            <th className="text-xs md:text-sm lg:text-base  p-2">URL</th>
            <th className="text-xs md:text-sm lg:text-base  text-center p-2">
              Status
            </th>
            <th className="text-xs md:text-sm lg:text-base  text-center p-2">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {cmds &&
            Object.keys(cmds).map((key: string) => {
              return (
                <tr key={key}>
                  <td className="text-xs md:text-sm lg:text-base border-r-2 border-r-bk-blue dark:border-r-bk-orange p-2">
                    {key}
                  </td>
                  <td className="text-xs md:text-sm lg:text-base  border-r-2 border-r-bk-blue dark:border-r-bk-orange p-2">
                    <a href={formatLink(cmds[key])}>{cmds[key]}</a>
                  </td>
                  <td className="text-xs md:text-sm lg:text-base  border-r-2 border-r-bk-blue dark:border-r-bk-orange">
                    <div className="flex justify-center items-center w-full h-full">
                      <StatusIcon
                        cmd={key}
                        selected={selected}
                        cmdStatus={cmdStatus}
                      />
                    </div>
                  </td>
                  <td className="text-xs md:text-sm lg:text-base ">
                    <button
                      onClick={() => {
                        setModalType("del");
                        setSelected({ cmd: key, url: cmds[key] });
                        openModal(true);
                      }}
                      className="flex justify-center items-center w-full"
                    >
                      <TrashIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 w-4 h-6 lg:w-6 lg:h-8" />
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
