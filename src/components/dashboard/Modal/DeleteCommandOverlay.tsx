import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SetStateAction } from "jotai";
import { Command } from "../../../store/command";
import { DeleteCommandRequest } from "../../../utils/api/request";
import {
  DeleteCommandResponse,
  ErrorResponse,
} from "../../../utils/api/response";
import { User } from "../../../utils/api/types";

type DeleteCommandOverlayProps = {
  user: User;
  del: UseMutationResult<
    DeleteCommandResponse,
    AxiosError<ErrorResponse, DeleteCommandRequest>,
    DeleteCommandRequest
  >;
  selected: Command | null;
  setIsOpen: (update: SetStateAction<boolean>) => void;
};

const DeleteCommandOverlay: React.FC<DeleteCommandOverlayProps> = ({
  user,
  del,
  selected,
  setIsOpen,
}) => {
  return (
    <div className="flex flex-col p-3 lg:p-6">
      <h1 className="py-1 text-3xl md:py-2 lg:py-3">Delete Command: </h1>
      <p className="text-md py-1 md:py-2 md:text-xl lg:py-3">
        Are you sure you want to delete command:
      </p>
      {selected && (
        <p className="text-md pb-5 font-bold md:text-xl">
          {selected.cmd} - {selected.url}
        </p>
      )}
      <div className="flex w-full items-center justify-between py-2 lg:py-4">
        <button
          onClick={() => setIsOpen(false)}
          className="w-24 rounded bg-bk-blue px-5 py-2 text-sm shadow-md hover:opacity-90 dark:bg-bk-orange md:w-40 md:text-xl"
        >
          Cancel
        </button>
        {selected && (
          <button
            onClick={() => {
              del.mutate({
                id: user.id,
                cmd: selected?.cmd,
              });
              setIsOpen(false);
            }}
            className="dark:gray-50 w-24 rounded bg-bk-red px-5 py-2 text-sm shadow-md hover:opacity-90 md:w-40 md:text-xl"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteCommandOverlay;
