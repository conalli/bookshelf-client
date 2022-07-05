import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseMutationResult } from "react-query";
import { Command } from "../../../pages/dashboard";
import { User } from "../../hooks/useAuth";
import { DelCmdData } from "../../hooks/useCmdData";
import { DelCMDRes, ErrorRes } from "../../utils/APITypes";

type DeleteCommandOverlayProps = {
  user: User;
  del: UseMutationResult<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosResponse<DelCMDRes, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AxiosError<ErrorRes, any>,
    DelCmdData,
    unknown
  >;
  selected: Command | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
                APIKey: user.APIKey,
                body: {
                  id: user.id,
                  cmd: selected?.cmd,
                },
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
