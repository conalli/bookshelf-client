import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseMutationResult } from "react-query";
import { Command } from "../../../pages/dashboard";
import { User } from "../../hooks/useAuth";
import { DelCmdData } from "../../hooks/useCmdData";

type DeleteCommandOverlayProps = {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  del: UseMutationResult<AxiosResponse<any, any>, unknown, DelCmdData, unknown>;
  selected: Command | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteCommandOverlay: React.FC<DeleteCommandOverlayProps> = ({
  user,
  del,
  selected,
  setIsOpen,
}) => {
  const deleteMessage = selected
    ? `Are you sure you want to delete command: ${selected.cmd} - ${selected.url}?`
    : "Error selecting command";
  return (
    <div className="">
      <h1>Delete Command: </h1>
      <p>{deleteMessage}</p>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      {selected && (
        <button
          onClick={() => {
            del.mutate({
              apiKey: user.apiKey,
              body: {
                id: user.id,
                cmd: selected?.cmd,
              },
            });
            if (del.isSuccess) setIsOpen(false);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default DeleteCommandOverlay;
