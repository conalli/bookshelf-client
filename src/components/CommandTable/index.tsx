import { TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { ModalType, UpdateCommandStatus } from "../../../pages/dashboard";
import { useSelectCommand } from "../../hooks/useCommands";
import { useOpenModal } from "../../hooks/useOpenModal";
import { CMD, User } from "../../utils/api/types";
import CommandPlaceholder from "./CommandPlaceholder";
import StatusIcon from "./StatusIcon";

type CommandTableProps = {
  commands: CMD | undefined;
  isLoadingCommands: boolean;
  user: User;
  setModalType: Dispatch<SetStateAction<ModalType>>;
  cmdStatus: UpdateCommandStatus;
};

const CommandTable: React.FC<CommandTableProps> = ({
  commands,
  isLoadingCommands,
  user,
  setModalType,
  cmdStatus,
}) => {
  const { setIsOpen } = useOpenModal();
  const { selectedCommand, setSelectedCommand } = useSelectCommand();
  if (!user) return null;

  const formatLink = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      return link;
    }
    return `http://${link}`;
  };
  // Refactor logic?
  if (commands && Object.keys(commands).length === 0) {
    return (
      <div className="w-full mt-6 lg:w-2/4 m-auto text-3xl text-center pt-10">
        Add your commands here.
      </div>
    );
  } else if (isLoadingCommands || !commands) {
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
        className="h-full w-full mt-1 md:mt-1.5 lg:w-2/4 mx-auto bg-white dark:bg-neutral-800 rounded shadow"
      >
        <thead className="text-left text-bk-blue dark:text-bk-orange bg-white dark:bg-neutral-800 rounded-lg border-b-2 border-b-bk-blue dark:border-b-bk-orange">
          <tr>
            <th className="text-xs md:text-sm lg:text-base p-2">Command</th>
            <th className="text-xs md:text-sm lg:text-base p-2 ">URL</th>
            <th className="text-xs md:text-sm lg:text-base text-center p-2">
              Status
            </th>
            <th className="text-xs md:text-sm lg:text-base text-center p-2">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {commands &&
            Object.keys(commands).map((key: string) => {
              return (
                <tr key={key}>
                  <td className="text-xs md:text-sm lg:text-base  p-2">
                    {key}
                  </td>
                  <td className="text-xs md:text-sm lg:text-base   p-2">
                    <a href={formatLink(commands[key])}>{commands[key]}</a>
                  </td>
                  <td className="text-xs md:text-sm lg:text-base ">
                    <div className="flex justify-center items-center w-full h-full">
                      <StatusIcon
                        cmd={key}
                        selected={selectedCommand}
                        cmdStatus={cmdStatus}
                      />
                    </div>
                  </td>
                  <td className="text-xs md:text-sm lg:text-base ">
                    <button
                      onClick={() => {
                        setModalType("delcmd");
                        setSelectedCommand({ cmd: key, url: commands[key] });
                        setIsOpen(true);
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
