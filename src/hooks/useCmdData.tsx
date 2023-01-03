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

const fetchCmds = () => {
  return axios.get<AxiosResponse<CMDList>, AxiosResponse<CMDList>, CMDList>(
    `${ReqURL.getCmds}`,
    {
      withCredentials: true,
    }
  );
};

export const useGetCmdData = (
  onSuccess?: () => void,
  callOnError?: () => void
) => {
  const { setErrorMessages } = useAuth();
  return useQuery<AxiosResponse<CMDList>, AxiosError<ErrorRes>>(
    "user-cmds",
    () => fetchCmds(),
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

const addCmd = (data: AddCMDReq) => {
  return axios.post<AddCMDRes, AxiosResponse<AddCMDRes>, AddCMDReq>(
    `${ReqURL.addCmd}`,
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const useAddCmdData = () => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<AxiosResponse<AddCMDRes>, AxiosError<ErrorRes>, AddCMDReq>(
    addCmd,
    {
      onMutate: async (addData) => {
        await queryClient.cancelQueries("user-cmds");
        const cmdList =
          queryClient.getQueryData<AxiosResponse<CMDList>>("user-cmds");
        queryClient.setQueryData<AxiosResponse<CMDList>>(
          "user-cmds",
          (prevData) => {
            const init = {} as AxiosResponse<CMDList>;
            const { cmd, url } = addData;
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
    }
  );
};

const delCmd = (data: DelCMDReq) => {
  return axios.patch<DelCMDRes, AxiosResponse<DelCMDRes>, DelCMDReq>(
    `${ReqURL.delCmd}`,
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const useDelCmdData = () => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<AxiosResponse<DelCMDRes>, AxiosError<ErrorRes>, DelCMDReq>(
    delCmd,
    {
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
    }
  );
};
