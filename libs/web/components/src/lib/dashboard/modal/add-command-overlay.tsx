"use client";

import type {
  AddCommandRequest,
  AddCommandResponse,
  ErrorResponse,
  User,
} from "@bookshelf-client/api";
import type { Command } from "@bookshelf-client/store";
import { Button } from "@bookshelf-client/ui/server";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { SetStateAction } from "jotai";
import type { ChangeEvent } from "react";
import { useState } from "react";

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

export function AddCommandOverlay({
  user,
  add,
  setSelected,
  setIsOpen,
}: AddCommandOverlayProps) {
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
      <div className="text-md py-2 md:text-xl lg:py-6">
        <div className="py-2">
          <label htmlFor="command" className="py-2 pl-1">
            Command:
          </label>
          <input
            id="command"
            className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block w-full appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
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
            className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block w-full appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            type="text"
            name="URL"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateData("url", e)
            }
          />
        </div>
      </div>
      <div className="flex w-full gap-2 py-2 lg:py-4 ">
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button
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
          variant={"add"}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
