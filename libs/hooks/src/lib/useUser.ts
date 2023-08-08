import { removeUserAtom, userAtom } from "@bookshelf-client/store";
import type { ErrorResponse, User } from "@bookshelf-client/utils";
import {
  APIURL,
  createQueryKey,
  exponentialBackoff,
} from "@bookshelf-client/utils";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useMessages } from "./useMessages";

export const USER_KEY = "user";

export const useUser = () => {
  return useAtomValue(userAtom);
};

export const useRemoveUser = () => {
  return useSetAtom(removeUserAtom);
};

const getUser = async () => {
  const res = await axios.get<User, AxiosResponse<User, null>, null>(
    APIURL.USER,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const useGetUser = (
  userKey?: string,
  options: UseQueryOptions<
    User,
    AxiosError<ErrorResponse, null>,
    User,
    QueryKey
  > = {},
  quiet = false,
  callOnError?: () => void
) => {
  const setUser = useSetAtom(userAtom);
  const { addMessage } = useMessages();
  return useQuery<User, AxiosError<ErrorResponse, null>>({
    queryKey: [createQueryKey(USER_KEY, userKey)],
    queryFn: getUser,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryDelay: exponentialBackoff,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response && !quiet) {
        const errRes = err.response.data as ErrorResponse;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
      if (callOnError) callOnError();
    },
    ...options,
  });
};
