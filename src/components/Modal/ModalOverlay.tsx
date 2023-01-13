import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { Command, ModalType } from "../../../pages/dashboard";
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
  selectedCommand: Command | null;
  setSelectedCommand: Dispatch<SetStateAction<Command | null>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  modalType,
  user,
  folder,
  addCommand,
  deleteCommand,
  addBookmark,
  setModalOpen,
  selectedCommand,
  setSelectedCommand,
}) => {
  switch (modalType) {
    case "addcmd":
      return (
        <AddCommandOverlay
          user={user}
          add={addCommand}
          setSelected={setSelectedCommand}
          setIsOpen={setModalOpen}
        />
      );
    case "delcmd":
      return (
        <DeleteCommandOverlay
          selected={selectedCommand || null}
          user={user}
          del={deleteCommand}
          setIsOpen={setModalOpen}
        />
      );
    case "addbookmark":
      return (
        <AddBookmarkOverlay
          folder={folder}
          add={addBookmark}
          setIsOpen={setModalOpen}
        />
      );
    default:
      return null;
  }
};

export default ModalOverlay;
