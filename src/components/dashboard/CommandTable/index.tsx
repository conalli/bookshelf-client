import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import React from "react";
import { UpdateCommandStatus } from "../../../../pages/dashboard";
import { useSelectCommand } from "../../../hooks/useCommands";
import { useModal } from "../../../hooks/useModal";
import { DELETE_COMMAND_MODAL } from "../../../store/modal";
import { CommandList, User } from "../../../utils/api/types";
import CommandPlaceholder from "./CommandPlaceholder";
import StatusIcon from "./StatusIcon";

type CommandTableProps = {
  commands: CommandList | undefined;
  isLoadingCommands: boolean;
  user: User;
  cmdStatus: UpdateCommandStatus;
};

const CommandTable: React.FC<CommandTableProps> = ({
  commands,
  isLoadingCommands,
  user,
  cmdStatus,
}) => {
  const { setIsOpen, setModalType } = useModal();
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
      <div className="m-auto mt-6 w-full pt-10 text-center text-3xl lg:w-2/4">
        Add your commands here.
      </div>
    );
  } else if (isLoadingCommands || !commands) {
    return (
      <div className="m-auto w-full pt-10 text-center text-3xl lg:w-2/4">
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
        className="mx-auto mt-1 h-full w-full rounded bg-white shadow dark:bg-neutral-800 md:mt-1.5 lg:w-2/4"
      >
        <thead className="rounded-lg border-b-2 border-b-bk-blue bg-white text-left text-bk-blue dark:border-b-bk-orange dark:bg-neutral-800 dark:text-bk-orange">
          <tr>
            <th className="p-2 text-xs md:text-sm lg:text-base">Command</th>
            <th className="p-2 text-xs md:text-sm lg:text-base ">URL</th>
            <th className="p-2 text-center text-xs md:text-sm lg:text-base">
              Status
            </th>
            <th className="p-2 text-center text-xs md:text-sm lg:text-base">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {commands &&
            Object.keys(commands).map((key: string) => {
              return (
                <tr key={key}>
                  <td className="p-2 text-xs md:text-sm  lg:text-base">
                    {key}
                  </td>
                  <td className="p-2 text-xs md:text-sm   lg:text-base">
                    <a href={formatLink(commands[key])}>{commands[key]}</a>
                  </td>
                  <td className="text-xs md:text-sm lg:text-base ">
                    <div className="flex h-full w-full items-center justify-center">
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
                        setModalType(DELETE_COMMAND_MODAL);
                        setSelectedCommand({ cmd: key, url: commands[key] });
                        setIsOpen(true);
                      }}
                      className="flex w-full items-center justify-center"
                    >
                      <TrashIcon className="h-6 w-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-100 lg:h-8 lg:w-6" />
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
