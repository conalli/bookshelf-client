import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { SetStateAction } from "jotai";
import { ChangeEvent, useState } from "react";
import { Command } from "../../store/command";
import { AddCommandRequest } from "../../utils/api/request";
import { AddCommandResponse, ErrorResponse } from "../../utils/api/response";
import { User } from "../../utils/api/types";

type AddCommandOverlayProps = {
  user: User;
  add: UseMutationResult<
    AddCommandResponse,
    AxiosError<ErrorResponse, AddCommandRequest>,
    AddCommandRequest
  >;
  setSelected: (update: SetStateAction<Command | null>) => void;
  setIsOpen: (update: SetStateAction<boolean>) => void;
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
            className="appearance-none bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
            type="text"
            name="URL"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateData("url", e)
            }
          />
        </div>
      </div>
      <div className="flex gap-2 w-full py-2 lg:py-4 ">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(false)}
          className="bg-bk-blue dark:bg-bk-orange text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90 rounded shadow-md"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={cmd.length && url.length ? { scale: 1.05 } : { scale: 1 }}
          onClick={() => {
            add.mutate({
              id: user.id,
              cmd,
              url,
            });
            setSelected({ cmd, url });
            setIsOpen(false);
          }}
          disabled={!cmd.length || !url.length}
          className="bg-green-400 dark:bg-gray-100 dark:text-neutral-600 text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90  disabled:opacity-50 disabled:bg-gray-300 disabled:text-opacity-50 rounded shadow-md"
        >
          Add
        </motion.button>
      </div>
    </div>
  );
};

export default AddCommandOverlay;
