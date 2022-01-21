import { TrashIcon } from "@heroicons/react/solid";
import React, { Dispatch, SetStateAction } from "react";
import { Command } from "../../../pages/dashboard";
import { User } from "../../hooks/useAuth";
import { useGetCmdData } from "../../hooks/useCmdData";

type CommandTableProps = {
  user: User | null;
  openModal: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<"add" | "del" | undefined>>;
  setSelected: Dispatch<SetStateAction<Command | null>>;
};

const CommandTable: React.FC<CommandTableProps> = ({
  user,
  openModal,
  setModalType,
  setSelected,
}) => {
  const { data } = useGetCmdData(
    user?.apiKey,
    () => console.log("Success!"),
    () => console.log("Error!")
  );
  if (!user) return null;
  const cmds = data?.data;

  return (
    <table className="w-full mt-6 lg:w-2/4 m-auto bg-white dark:bg-neutral-800 rounded shadow">
      <thead className="text-left text-white bg-bk-blue dark:bg-bk-orange rounded-lg">
        <tr className="rounded-md">
          <th className="border-r-bk-blue p-2">Command</th>
          <th className="border-r-bk-blue p-2">URL</th>
          <th className="text-center p-2">Del</th>
        </tr>
      </thead>
      <tbody className="">
        {cmds &&
          Object.keys(cmds).map((key: string) => {
            return (
              <tr key={key}>
                <td className="border-r-2 border-r-bk-blue p-2">{key}</td>
                <td className="border-r-2 border-r-bk-blue p-2">
                  <a href={cmds[key]}>{cmds[key]}</a>
                </td>
                <td className="">
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
    </table>
  );
};

export default CommandTable;
