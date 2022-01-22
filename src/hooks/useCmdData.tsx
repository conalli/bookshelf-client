import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddCMDReq, AddCMDRes, DelCMDReq, DelCMDRes } from "../utils/APITypes";
import { ReqURL } from "../utils/APIEndpoints";

export type CMDList = { [c: string]: string };

const fetchCmds = (apiKey: string) => {
  return axios.get<CMDList>(`${ReqURL.getCmds}${apiKey}`, {
    withCredentials: true,
  });
};

export const useGetCmdData = (
  apikey = "",
  onSuccess: () => void,
  onError: () => void
) => {
  return useQuery("user-cmds", () => fetchCmds(apikey), {
    onSuccess,
    onError,
  });
};

export type AddCmdData = {
  apiKey: string;
  body: AddCMDReq;
};

const addCmd = (data: AddCmdData) => {
  return axios.put<AddCMDRes>(`${ReqURL.addCmd}${data.apiKey}`, data.body, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};

export const useAddCmdData = () => {
  const queryClient = useQueryClient();
  return useMutation(addCmd, {
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
    onError: () => {
      queryClient.setQueryData<CMDList>("user-cmds", (prev) => prev || {});
    },
  });
};

export type DelCmdData = {
  apiKey: string;
  body: DelCMDReq;
};

const delCmd = (data: DelCmdData) => {
  return axios.put<DelCMDRes>(`${ReqURL.delCmd}${data.apiKey}`, data.body, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};

export const useDelCmdData = () => {
  const queryClient = useQueryClient();
  return useMutation(delCmd, {
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
    onError: () => {
      queryClient.setQueryData<CMDList>("user-cmds", (prev) => prev || {});
    },
  });
};
