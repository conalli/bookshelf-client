"use client";

import type {
  AddBookmarkRequest,
  AddBookmarkResponse,
  AddCommandRequest,
  AddCommandResponse,
  DeleteCommandRequest,
  DeleteCommandResponse,
  ErrorResponse,
  Folder,
  User,
} from "@bookshelf-client/api";
import {
  useModal,
  useSelectBookmark,
  useSelectCommand,
} from "@bookshelf-client/hooks";
import {
  ADD_BOOKMARK_MODAL,
  ADD_COMMAND_MODAL,
  DELETE_BOOKMARK_MODAL,
  DELETE_COMMAND_MODAL,
} from "@bookshelf-client/store";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { AddBookmarkOverlay } from "./Modal/AddBookmarkOverlay";
import { AddCommandOverlay } from "./Modal/AddCommandOverlay";
import { DeleteBookmarkOverlay } from "./Modal/DeleteBookmarkOverlay";
import { DeleteCommandOverlay } from "./Modal/DeleteCommandOverlay";

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

export function ModalOverlay({
  user,
  folder,
  addCommand,
  deleteCommand,
  addBookmark,
}: ModalOverlayProps) {
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
}
