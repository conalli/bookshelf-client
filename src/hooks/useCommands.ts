import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIURL } from "../utils/api/endpoints";
import {
  AddCMDReq,
  AddCMDRes,
  CMD,
  DelCMDReq,
  DelCMDRes,
  ErrorRes,
} from "../utils/api/types";
import { createQueryKey } from "../utils/query/cache";
import { useMessages } from "./useMessages";

export const COMMAND_KEY = "cmds";

const fetchCmds = async () => {
  const res = await axios.get<CMD, AxiosResponse<CMD, null>, null>(APIURL.CMD, {
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
  return useQuery<CMD, AxiosError<ErrorRes, null>>(
    [createQueryKey(COMMAND_KEY, userKey)],
    fetchCmds,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          const errRes = err.response.data as ErrorRes;
          addMessage(`${errRes.title} -- ${errRes.detail}`, true);
        }
        if (callOnError) callOnError();
      },
    }
  );
};

const addCmd = async (data: AddCMDReq) => {
  const res = await axios.post<AddCMDRes, AxiosResponse<AddCMDRes>, AddCMDReq>(
    APIURL.CMD,
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
};

export const useAddCommand = (userKey?: string) => {
  const queryClient = useQueryClient();
  const { addMessage } = useMessages();
  return useMutation<AddCMDRes, AxiosError<ErrorRes, AddCMDReq>, AddCMDReq>(
    addCmd,
    {
      onMutate: async (addData) => {
        await queryClient.cancelQueries([createQueryKey(COMMAND_KEY, userKey)]);
        const cmdList = queryClient.getQueryData<CMD>([
          createQueryKey(COMMAND_KEY, userKey),
        ]);
        queryClient.setQueryData<CMD>(
          [createQueryKey(COMMAND_KEY, userKey)],
          (prevData) => {
            const init = {} as CMD;
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
        if (axios.isAxiosError(err) && err.response) {
          const errRes = err.response.data as ErrorRes;
          addMessage(`${errRes.title} -- ${errRes.detail}`, true);
        }
        queryClient.setQueryData<CMD>(
          [createQueryKey(COMMAND_KEY, userKey)],
          (prev) => prev || {}
        );
      },
    }
  );
};

const delCmd = async (data: DelCMDReq) => {
  const res = await axios.patch<
    DelCMDRes,
    AxiosResponse<DelCMDRes, DelCMDReq>,
    DelCMDReq
  >(APIURL.CMD, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const useDeleteCommand = (userKey?: string) => {
  const queryClient = useQueryClient();
  const { addMessage } = useMessages();
  return useMutation<DelCMDRes, AxiosError<ErrorRes, DelCMDReq>, DelCMDReq>(
    delCmd,
    {
      onSettled: () => {
        queryClient.invalidateQueries([createQueryKey(COMMAND_KEY, userKey)]);
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          const errRes = err.response.data as ErrorRes;
          addMessage(`${errRes.title} -- ${errRes.detail}`, true);
        }
        queryClient.setQueryData<CMD>(
          [createQueryKey(COMMAND_KEY, userKey)],
          (prev) => prev || {}
        );
      },
    }
  );
};
