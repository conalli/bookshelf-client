import { AxiosResponse } from "axios";
import { UseMutationResult } from "react-query";
import { Command } from "../../../pages/dashboard";
import { User } from "../../hooks/useAuth";
import { DelCmdData } from "../../hooks/useCmdData";

type DeleteCommandOverlayProps = {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  del: UseMutationResult<AxiosResponse<any, any>, unknown, DelCmdData, unknown>;
  selected: Command | null;
};

const DeleteCommandOverlay: React.FC<DeleteCommandOverlayProps> = ({
  user,
  del,
  selected,
}) => {
  const deleteMessage = selected
    ? `Are you sure you want to delete command: ${selected.cmd} - ${selected.url}?`
    : "Error selecting command";
  return (
    <div className="">
      <h1>Delete Command: </h1>
      <p>{deleteMessage}</p>
      <button>Cancel</button>
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
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default DeleteCommandOverlay;
