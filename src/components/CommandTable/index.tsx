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
    <table className="min-w-full bg-white dark:bg-neutral-900 rounded shadow">
      <thead className="text-left divide-y divide-gray-200 bg-bk-blue bg-opacity-40">
        <tr className="rounded-t-md">
          <th>Command</th>
          <th>URL</th>
          <th>Del</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {cmds &&
          Object.keys(cmds).map((key: string) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <a href={cmds[key]}>{cmds[key]}</a>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setModalType("del");
                      setSelected({ cmd: key, url: cmds[key] });
                      openModal(true);
                    }}
                    className="text-bk-red"
                  >
                    消す
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
