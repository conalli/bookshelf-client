"use client";

import { CommandList, User } from "@bookshelf-client/api";
import { useModal, useSelectCommand } from "@bookshelf-client/hooks";
import { DELETE_COMMAND_MODAL } from "@bookshelf-client/store";
import type { UpdateCommandStatus } from "@bookshelf-client/utils";
import { TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { CommandPlaceholder } from "./command-placeholder";
import { StatusIcon } from "./status-icon";

type CommandTableProps = {
  commands: CommandList | undefined;
  isLoadingCommands: boolean;
  user: User;
  cmdStatus: UpdateCommandStatus;
};

const formatLink = (link: string) => {
  if (link.startsWith("http://") || link.startsWith("https://")) {
    return link;
  }
  return `http://${link}`;
};

export function CommandTable({
  commands,
  isLoadingCommands,
  user,
  cmdStatus,
}: CommandTableProps) {
  const { setIsOpen, setModalType } = useModal();
  const { selectedCommand, setSelectedCommand } = useSelectCommand();
  if (!user) return null;

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
        className="rounded bg-white px-8 py-2 shadow dark:bg-neutral-800 md:mt-1.5 lg:w-2/4"
      >
        <thead className="border-b-bk-blue text-bk-blue dark:border-b-bk-orange dark:text-bk-orange rounded-lg border-b-2 bg-white text-left dark:bg-neutral-800">
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
                <tr key={key} className="hover:bg-neutral-700">
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
}
