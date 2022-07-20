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

const fetchCmds = (APIKey: string) => {
  return axios.get<AxiosResponse<CMDList>, AxiosResponse<CMDList>, CMDList>(
    `${ReqURL.getCmds}${APIKey}`,
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

export type AddCmdData = {
  APIKey: string;
  body: AddCMDReq;
};

const addCmd = (data: AddCmdData) => {
  return axios.post<AddCMDRes, AxiosResponse<AddCMDRes>, AddCMDReq>(
    `${ReqURL.addCmd}${data.APIKey}`,
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
  return useMutation<
    AxiosResponse<AddCMDRes>,
    AxiosError<ErrorRes>,
    AddCmdData
  >(addCmd, {
    onMutate: async (addData) => {
      await queryClient.cancelQueries("user-cmds");
      const cmdList =
        queryClient.getQueryData<AxiosResponse<CMDList>>("user-cmds");
      queryClient.setQueryData<AxiosResponse<CMDList>>(
        "user-cmds",
        (prevData) => {
          const init = {} as AxiosResponse<CMDList>;
          const { cmd, url } = addData.body;
          if (!prevData) return { ...init, data: { cmd: url } };
          return { ...prevData, data: { ...prevData.data, [cmd]: url } };
        }
      );
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
  APIKey: string;
  body: DelCMDReq;
};

const delCmd = (data: DelCmdData) => {
  return axios.patch<DelCMDRes, AxiosResponse<DelCMDRes>, DelCMDReq>(
    `${ReqURL.delCmd}${data.APIKey}`,
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
  return useMutation<
    AxiosResponse<DelCMDRes>,
    AxiosError<ErrorRes>,
    DelCmdData
  >(delCmd, {
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
