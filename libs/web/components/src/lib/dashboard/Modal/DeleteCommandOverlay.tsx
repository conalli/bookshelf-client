import type {
  DeleteCommandRequest,
  DeleteCommandResponse,
  ErrorResponse,
  User,
} from "@bookshelf-client/api";
import type { Command } from "@bookshelf-client/store";
import { Button } from "@bookshelf-client/ui/server";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { SetStateAction } from "jotai";

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

export function DeleteCommandOverlay({
  user,
  del,
  selected,
  setIsOpen,
}: DeleteCommandOverlayProps) {
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
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        {selected && (
          <Button
            onClick={() => {
              del.mutate({
                id: user.id,
                cmd: selected?.cmd,
              });
              setIsOpen(false);
            }}
            variant={"destructive"}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
