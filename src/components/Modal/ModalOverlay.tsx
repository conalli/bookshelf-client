import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ModalType } from "../../../pages/dashboard";
import { useSelectCommand } from "../../hooks/useCommands";
import { useOpenModal } from "../../hooks/useOpenModal";
import {
  AddBookmarkRequest,
  AddBookmarkResponse,
  AddCMDReq,
  AddCMDRes,
  DelCMDReq,
  DelCMDRes,
  ErrorRes,
  Folder,
  User,
} from "../../utils/api/types";
import AddBookmarkOverlay from "./AddBookmarkOverlay";
import AddCommandOverlay from "./AddCommandOverlay";
import DeleteCommandOverlay from "./DeleteCommandOverlay";

type ModalOverlayProps = {
  modalType: ModalType;
  user: User;
  folder: Folder | undefined;
  addCommand: UseMutationResult<
    AddCMDRes,
    AxiosError<ErrorRes, AddCMDReq>,
    AddCMDReq,
    unknown
  >;
  deleteCommand: UseMutationResult<
    DelCMDRes,
    AxiosError<ErrorRes, DelCMDReq>,
    DelCMDReq,
    unknown
  >;
  addBookmark: UseMutationResult<
    AddBookmarkResponse,
    AxiosError<ErrorRes, AddBookmarkRequest>,
    AddBookmarkRequest,
    unknown
  >;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  modalType,
  user,
  folder,
  addCommand,
  deleteCommand,
  addBookmark,
}) => {
  const { setIsOpen } = useOpenModal();
  const { selectedCommand, setSelectedCommand } = useSelectCommand();
  switch (modalType) {
    case "addcmd":
      return (
        <AddCommandOverlay
          user={user}
          add={addCommand}
          setSelected={setSelectedCommand}
          setIsOpen={setIsOpen}
        />
      );
    case "delcmd":
      return (
        <DeleteCommandOverlay
          selected={selectedCommand || null}
          user={user}
          del={deleteCommand}
          setIsOpen={setIsOpen}
        />
      );
    case "addbookmark":
      return (
        <AddBookmarkOverlay
          folder={folder}
          add={addBookmark}
          setIsOpen={setIsOpen}
        />
      );
    default:
      return null;
  }
};

export default ModalOverlay;
