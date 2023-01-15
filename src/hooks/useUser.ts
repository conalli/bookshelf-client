import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { removeUserAtom, userAtom } from "../store/user";
import { APIURL } from "../utils/api/endpoints";
import { ErrorRes, User } from "../utils/api/types";
import { createQueryKey, exponentialBackoff } from "../utils/query/helpers";
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
    AxiosError<ErrorRes, null>,
    User,
    QueryKey
  > = {},
  quiet = false,
  callOnError?: () => void
) => {
  const setUser = useSetAtom(userAtom);
  const { addMessage } = useMessages();
  return useQuery<User, AxiosError<ErrorRes, null>>({
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
        const errRes = err.response.data as ErrorRes;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
      if (callOnError) callOnError();
    },
    ...options,
  });
};
