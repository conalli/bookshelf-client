"use client";

import { selectedCommandAtom } from "@bookshelf-client/store";
import type {
  AddCommandRequest,
  AddCommandResponse,
  CommandList,
  DeleteCommandRequest,
  DeleteCommandResponse,
  ErrorResponse,
} from "@bookshelf-client/utils";
import {
  APIURL,
  createQueryKey,
  exponentialBackoff,
} from "@bookshelf-client/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import axios, { isAxiosError } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useMessages } from "./useMessages";

export const COMMAND_KEY = "cmds";

const fetchCmds = async () => {
  const res = await axios.get<
    CommandList,
    AxiosResponse<CommandList, null>,
    null
  >(APIURL.CommandList, {
    withCredentials: true,
  });
  return res.data;
};

export const useGetCommands = (
  userKey?: string,
  onSuccess?: () => void,
  callOnError?: () => void
) => {
  const { addMessage } = useMessages();
  return useQuery<CommandList, AxiosError<ErrorResponse, null>>(
    [createQueryKey(COMMAND_KEY, userKey)],
    fetchCmds,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retryDelay: exponentialBackoff,
      onSuccess,
      onError: (err) => {
        if (isAxiosError(err) && err.response) {
          const errRes = err.response.data as ErrorResponse;
          addMessage(`${errRes.title} -- ${errRes.detail}`, true);
        }
        if (callOnError) callOnError();
      },
    }
  );
};

const addCmd = async (data: AddCommandRequest) => {
  const res = await axios.post<
    AddCommandResponse,
    AxiosResponse<AddCommandResponse>,
    AddCommandRequest
  >(APIURL.CommandList, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const useAddCommand = (userKey?: string) => {
  const queryClient = useQueryClient();
  const { addMessage } = useMessages();
  return useMutation<
    AddCommandResponse,
    AxiosError<ErrorResponse, AddCommandRequest>,
    AddCommandRequest
  >(addCmd, {
    onMutate: async (addData) => {
      await queryClient.cancelQueries([createQueryKey(COMMAND_KEY, userKey)]);
      const cmdList = queryClient.getQueryData<CommandList>([
        createQueryKey(COMMAND_KEY, userKey),
      ]);
      queryClient.setQueryData<CommandList>(
        [createQueryKey(COMMAND_KEY, userKey)],
        (prevData) => {
          const init = {} as CommandList;
          const { cmd, url } = addData;
          if (!prevData) return { ...init, [cmd]: url };
          return { ...prevData, [cmd]: url };
        }
      );
      return cmdList || {};
    },
    onSettled: () => {
      queryClient.invalidateQueries([createQueryKey(COMMAND_KEY, userKey)]);
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorResponse;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
      queryClient.setQueryData<CommandList>(
        [createQueryKey(COMMAND_KEY, userKey)],
        (prev) => prev || {}
      );
    },
  });
};

const delCmd = async (data: DeleteCommandRequest) => {
  const res = await axios.patch<
    DeleteCommandResponse,
    AxiosResponse<DeleteCommandResponse, DeleteCommandRequest>,
    DeleteCommandRequest
  >(APIURL.CommandList, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const useDeleteCommand = (userKey?: string) => {
  const queryClient = useQueryClient();
  const { addMessage } = useMessages();
  return useMutation<
    DeleteCommandResponse,
    AxiosError<ErrorResponse, DeleteCommandRequest>,
    DeleteCommandRequest
  >(delCmd, {
    onSettled: () => {
      queryClient.invalidateQueries([createQueryKey(COMMAND_KEY, userKey)]);
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorResponse;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
      queryClient.setQueryData<CommandList>(
        [createQueryKey(COMMAND_KEY, userKey)],
        (prev) => prev || {}
      );
    },
  });
};

export const useSelectCommand = () => {
  const selectedCommand = useAtomValue(selectedCommandAtom);
  const setSelectedCommand = useSetAtom(selectedCommandAtom);
  return { selectedCommand, setSelectedCommand };
};
