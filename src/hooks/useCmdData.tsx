import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AddCMDReq,
  AddCMDRes,
  DelCMDReq,
  DelCMDRes,
  ErrorRes,
} from "../utils/APITypes";
import { ReqURL } from "../utils/APIEndpoints";
import { useAuth } from "./useAuth";
import { createErrorMessage } from "../utils/errorMessages";

export type CMDList = { [c: string]: string };

const fetchCmds = (apiKey: string) => {
  return axios.get<AxiosResponse<CMDList>, AxiosResponse<CMDList>, CMDList>(
    `${ReqURL.getCmds}${apiKey}`,
    {
      withCredentials: true,
    }
  );
};

export const useGetCmdData = (
  apikey = "",
  onSuccess?: () => void,
  callOnError?: () => void
) => {
  const { setErrorMessages } = useAuth();
  return useQuery<AxiosResponse<CMDList>, AxiosError<ErrorRes>>(
    "user-cmds",
    () => fetchCmds(apikey),
    {
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

export type AddCmdData = {
  apiKey: string;
  body: AddCMDReq;
};

const addCmd = (data: AddCmdData) => {
  return axios.put<AddCMDRes, AddCMDRes>(
    `${ReqURL.addCmd}${data.apiKey}`,
    data.body,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const useAddCmdData = () => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<AddCMDRes, AxiosError<ErrorRes>, AddCmdData>(addCmd, {
    onMutate: async (addData) => {
      await queryClient.cancelQueries("user-cmds");
      const cmdList = queryClient.getQueryData<CMDList>("user-cmds");
      queryClient.setQueryData<CMDList>("user-cmds", (prevData) => {
        const { cmd, url } = addData.body;
        return { ...prevData, [cmd]: url };
      });
      return cmdList || {};
    },
    onSettled: () => {
      queryClient.invalidateQueries("user-cmds");
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorRes;
        setErrorMessages((prev) => {
          return [...prev, createErrorMessage(errRes.error)];
        });
      }
      queryClient.setQueryData<CMDList>("user-cmds", (prev) => prev || {});
    },
  });
};

export type DelCmdData = {
  apiKey: string;
  body: DelCMDReq;
};

const delCmd = (data: DelCmdData) => {
  return axios.put<DelCMDRes, DelCMDRes>(
    `${ReqURL.delCmd}${data.apiKey}`,
    data.body,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const useDelCmdData = () => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<DelCMDRes, AxiosError<ErrorRes>, DelCmdData>(delCmd, {
    onMutate: async (delData) => {
      await queryClient.cancelQueries("user-cmds");
      const cmdList = queryClient.getQueryData<CMDList>("user-cmds");
      queryClient.setQueryData<CMDList>("user-cmds", (prevData) => {
        if (!prevData) return {};
        const { cmd } = delData.body;
        if (cmd in prevData) {
          delete prevData.cmd;
        }
        return { ...prevData };
      });
      return cmdList || {};
    },
    onSettled: () => {
      queryClient.invalidateQueries("user-cmds");
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorRes;
        setErrorMessages((prev) => {
          return [...prev, createErrorMessage(errRes.error)];
        });
      }
      queryClient.setQueryData<CMDList>("user-cmds", (prev) => prev || {});
    },
  });
};
