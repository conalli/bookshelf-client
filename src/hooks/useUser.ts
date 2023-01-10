import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ReqURL } from "../utils/APIEndpoints";
import { ErrorRes, User } from "../utils/APITypes";
import { createErrorMessage } from "../utils/errorMessages";
import { useAuth } from "./useAuth";

export const USER_KEY = "user";

const getUser = async () => {
  const res = await axios.get<User, AxiosResponse<User, null>, null>(
    `${ReqURL.base}/user`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const useUser = (onSuccess?: () => void, callOnError?: () => void) => {
  const { setErrorMessages } = useAuth();
  return useQuery<User, AxiosError<ErrorRes, null>>([USER_KEY], getUser, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess,
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorRes;
        setErrorMessages((prev) => {
          return [
            ...prev,
            createErrorMessage(`${errRes.title} -- ${errRes.detail}`),
          ];
        });
      }
      if (callOnError) callOnError();
    },
  });
};
