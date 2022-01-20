import { AxiosResponse } from "axios";
import React from "react";
import { UseMutationResult } from "react-query";
import { User } from "../../hooks/useAuth";
import { DelCmdData, useGetCmdData } from "../../hooks/useCmdData";

type CommandTableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  del: UseMutationResult<AxiosResponse<any, any>, unknown, DelCmdData, unknown>;
  user: User | null;
};

const CommandTable: React.FC<CommandTableProps> = ({ del, user }) => {
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
                    onClick={() =>
                      del.mutate({
                        apiKey: user.apiKey,
                        body: {
                          id: user.id,
                          cmd: key,
                        },
                      })
                    }
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
