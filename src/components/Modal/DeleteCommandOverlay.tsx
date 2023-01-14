import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SetStateAction } from "jotai";
import { Command } from "../../../pages/dashboard";
import { DelCMDReq, DelCMDRes, ErrorRes, User } from "../../utils/api/types";

type DeleteCommandOverlayProps = {
  user: User;
  del: UseMutationResult<DelCMDRes, AxiosError<ErrorRes, DelCMDReq>, DelCMDReq>;
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
      <h1 className="text-3xl py-1 md:py-2 lg:py-3">Delete Command: </h1>
      <p className="text-md md:text-xl py-1 md:py-2 lg:py-3">
        Are you sure you want to delete command:
      </p>
      {selected && (
        <p className="text-md md:text-xl font-bold pb-5">
          {selected.cmd} - {selected.url}
        </p>
      )}
      <div className="flex justify-between items-center w-full py-2 lg:py-4">
        <button
          onClick={() => setIsOpen(false)}
          className="bg-bk-blue dark:bg-bk-orange text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90 rounded shadow-md"
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
            className="bg-bk-red dark:gray-50 text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90 rounded shadow-md"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteCommandOverlay;
