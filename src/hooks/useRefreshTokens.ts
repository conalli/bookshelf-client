import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { APIURL } from "../utils/api/endpoints";
import { ErrorRes } from "../utils/api/types";
import { useMessages } from "./useMessages";

const REFRESH_KEY = "refresh";
const REFRESH_INTERVAL = 1000 * 60 * 9;

const refreshTokens = async () => {
  const res = await axios.post<null, AxiosResponse<null, null>, null>(
    APIURL.REFRESH,
    null,
    {
      withCredentials: true,
    }
  );
  return res.status === 200;
};

export const useRefreshTokens = () => {
  const router = useRouter();
  const { addMessage } = useMessages();
  return useQuery([REFRESH_KEY], refreshTokens, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: REFRESH_INTERVAL,
    refetchIntervalInBackground: true,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ErrorRes, null>;
        if (err.response !== undefined) {
          addMessage(`${err.response?.data.title}`, true);
        }
      }
      router.push("/signin");
    },
  });
};
