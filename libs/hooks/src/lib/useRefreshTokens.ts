"use client";

import { APIURL, type ErrorResponse } from "@bookshelf-client/api";
import { createQueryKey, exponentialBackoff } from "@bookshelf-client/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMessages } from "./useMessages";

export const REFRESH_KEY = "refresh";
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

export const useRefreshTokens = (userKey?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addMessage } = useMessages();
  return useQuery({
    queryKey: [createQueryKey(REFRESH_KEY, userKey)],
    queryFn: refreshTokens,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: REFRESH_INTERVAL,
    refetchIntervalInBackground: true,
    retryDelay: exponentialBackoff,
    staleTime: REFRESH_INTERVAL,
    onError: (error) => {
      if (isAxiosError(error)) {
        const err = error as AxiosError<ErrorResponse, null>;
        if (err.response !== undefined) {
          addMessage(`${err.response?.data.title}`, true);
        }
      }
      queryClient.clear();
      router.push("/signin");
    },
  });
};
