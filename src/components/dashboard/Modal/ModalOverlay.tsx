import { useModal, useSelectBookmark, useSelectCommand } from "@hooks";
import {
  ADD_BOOKMARK_MODAL,
  ADD_COMMAND_MODAL,
  DELETE_BOOKMARK_MODAL,
  DELETE_COMMAND_MODAL,
} from "@store/modal";
import type { UseMutationResult } from "@tanstack/react-query";
import type {
  AddBookmarkRequest,
  AddCommandRequest,
  DeleteCommandRequest,
} from "@utils/api/request";
import type {
  AddBookmarkResponse,
  AddCommandResponse,
  DeleteCommandResponse,
  ErrorResponse,
} from "@utils/api/response";
import type { Folder, User } from "@utils/api/types";
import type { AxiosError } from "axios";
import AddBookmarkOverlay from "./AddBookmarkOverlay";
import AddCommandOverlay from "./AddCommandOverlay";
import DeleteBookmarkOverlay from "./DeleteBookmarkOverlay";
import DeleteCommandOverlay from "./DeleteCommandOverlay";

type ModalOverlayProps = {
  user: User;
  folder: Folder | undefined;
  addCommand: UseMutationResult<
    AddCommandResponse,
    AxiosError<ErrorResponse, AddCommandRequest>,
    AddCommandRequest,
    unknown
  >;
  deleteCommand: UseMutationResult<
    DeleteCommandResponse,
    AxiosError<ErrorResponse, DeleteCommandRequest>,
    DeleteCommandRequest,
    unknown
  >;
  addBookmark: UseMutationResult<
    AddBookmarkResponse,
    AxiosError<ErrorResponse, AddBookmarkRequest>,
    AddBookmarkRequest,
    unknown
  >;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  user,
  folder,
  addCommand,
  deleteCommand,
  addBookmark,
}) => {
  const { setIsOpen, modalType } = useModal();
  const { selectedCommand, setSelectedCommand } = useSelectCommand();
  const { selectedBookmark } = useSelectBookmark();
  switch (modalType) {
    case ADD_COMMAND_MODAL:
      return (
        <AddCommandOverlay
          user={user}
          add={addCommand}
          setSelected={setSelectedCommand}
          setIsOpen={setIsOpen}
        />
      );
    case DELETE_COMMAND_MODAL:
      return (
        <DeleteCommandOverlay
          selected={selectedCommand || null}
          user={user}
          del={deleteCommand}
          setIsOpen={setIsOpen}
        />
      );
    case ADD_BOOKMARK_MODAL:
      return (
        <AddBookmarkOverlay
          folder={folder}
          add={addBookmark}
          setIsOpen={setIsOpen}
        />
      );
    case DELETE_BOOKMARK_MODAL:
      return (
        <DeleteBookmarkOverlay
          apiKey={user.api_key}
          selected={selectedBookmark}
          setIsOpen={setIsOpen}
        />
      );
    default:
      return null;
  }
};

export default ModalOverlay;
