import { AxiosResponse } from "axios";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { UseMutationResult } from "react-query";
import { Command } from "../../../pages/dashboard";
import { User } from "../../hooks/useAuth";
import { AddCmdData } from "../../hooks/useCmdData";

type AddCommandOverlayProps = {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add: UseMutationResult<AxiosResponse<any, any>, unknown, AddCmdData, unknown>;
  setSelected: Dispatch<SetStateAction<Command | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCommandOverlay: React.FC<AddCommandOverlayProps> = ({
  user,
  add,
  setSelected,
  setIsOpen,
}) => {
  const [cmd, setCmd] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const updateData = (
    type: "cmd" | "url",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (type === "cmd") {
      setCmd(e.target.value);
      return;
    }
    setUrl(e.target.value);
  };

  return (
    <div className="flex flex-col p-3 lg:p-6">
      <h1 className="text-3xl">Add Command: </h1>
      <div className="py-2 lg:py-6 text-md md:text-xl">
        <div className="py-2">
          <label htmlFor="command" className="py-2 pl-1">
            Command:
          </label>
          <input
            id="command"
            className="appearance-none bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
            type="text"
            name="command"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateData("cmd", e)
            }
          />
        </div>
        <div className="py-2">
          <label htmlFor="URL" className="py-2 pl-1">
            URL:
          </label>
          <input
            id="URL"
            className="appearance-none bg-gray-100  text-gray-900 text-sm rounded-lg focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
            type="text"
            name="URL"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateData("url", e)
            }
          />
        </div>
      </div>
      <div className="flex gap-2 w-full py-2 lg:py-4 ">
        <button
          onClick={() => setIsOpen(false)}
          className="bg-bk-blue dark:bg-bk-orange text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90 rounded shadow-md"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            add.mutate({
              apiKey: user.apiKey,
              body: {
                id: user.id,
                cmd,
                url,
              },
            });
            setSelected({ cmd, url });
            setIsOpen(false);
          }}
          className="bg-green-400 dark:bg-gray-100 dark:text-neutral-600 text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90 rounded shadow-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCommandOverlay;
