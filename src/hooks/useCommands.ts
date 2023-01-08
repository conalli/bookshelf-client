import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddCMDReq,
  AddCMDRes,
  CMD,
  DelCMDReq,
  DelCMDRes,
  ErrorRes,
} from "../utils/APITypes";
import { ReqURL } from "../utils/APIEndpoints";
import { useAuth } from "./useAuth";
import { createErrorMessage } from "../utils/errorMessages";

const COMMAND_KEY = "cmds";

const fetchCmds = async () => {
  const res = await axios.get<CMD, AxiosResponse<CMD, null>, null>(
    `${ReqURL.getCmds}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const useGetCommands = (
  userID: string,
  onSuccess?: () => void,
  callOnError?: () => void
) => {
  const { setErrorMessages } = useAuth();
  return useQuery<CMD, AxiosError<ErrorRes, null>>(
    [userID, COMMAND_KEY],
    fetchCmds,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          const errRes = err.response.data as ErrorRes;
          setErrorMessages((prev) => {
            return [...prev, createErrorMessage(errRes.error)];
          });
        }
        if (callOnError) callOnError();
      },
    }
  );
};

const addCmd = async (data: AddCMDReq) => {
  const res = await axios.post<AddCMDRes, AxiosResponse<AddCMDRes>, AddCMDReq>(
    `${ReqURL.addCmd}`,
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
};

export const useAddCmdData = (userID: string) => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<AddCMDRes, AxiosError<ErrorRes>, AddCMDReq>(addCmd, {
    onMutate: async (addData) => {
      await queryClient.cancelQueries([userID, COMMAND_KEY]);
      const cmdList = queryClient.getQueryData<CMD>([userID, COMMAND_KEY]);
      queryClient.setQueryData<CMD>([userID, COMMAND_KEY], (prevData) => {
        const init = {} as CMD;
        const { cmd, url } = addData;
        if (!prevData) return { ...init, [cmd]: url };
        return { ...prevData, [cmd]: url };
      });
      return cmdList || {};
    },
    onSettled: () => {
      queryClient.invalidateQueries([userID, COMMAND_KEY]);
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorRes;
        setErrorMessages((prev) => {
          return [...prev, createErrorMessage(errRes.error)];
        });
      }
      queryClient.setQueryData<CMD>(
        [userID, COMMAND_KEY],
        (prev) => prev || {}
      );
    },
  });
};

const delCmd = async (data: DelCMDReq) => {
  const res = await axios.patch<
    DelCMDRes,
    AxiosResponse<DelCMDRes, DelCMDReq>,
    DelCMDReq
  >(`${ReqURL.delCmd}`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const useDelCmdData = (userID: string) => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<DelCMDRes, AxiosError<ErrorRes, DelCMDReq>, DelCMDReq>(
    delCmd,
    {
      onSettled: () => {
        queryClient.invalidateQueries([userID, COMMAND_KEY]);
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          const errRes = err.response.data as ErrorRes;
          setErrorMessages((prev) => {
            return [...prev, createErrorMessage(errRes.error)];
          });
        }
        queryClient.setQueryData<CMD>(
          [userID, COMMAND_KEY],
          (prev) => prev || {}
        );
      },
    }
  );
};
