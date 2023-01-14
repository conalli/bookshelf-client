import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { APIURL } from "../utils/api/endpoints";
import {
  AddBookmarkFileResponse,
  AddBookmarkRequest,
  AddBookmarkResponse,
  ErrorRes,
  Folder,
} from "../utils/api/types";
import { createQueryKey } from "../utils/query/cache";
import { useMessages } from "./useMessages";

export const BOOKMARKS_FILE_FORM_KEY = "bookmarks_file";
export const BOOKMARKS_KEY = "bookmarks";

const addBookmark = async (data: AddBookmarkRequest) => {
  const res = await axios.post<
    AddBookmarkResponse,
    AxiosResponse<AddBookmarkResponse, AddBookmarkRequest>,
    AddBookmarkRequest
  >(APIURL.BOOKMARKS, data, { withCredentials: true });
  return res.data;
};

export const useAddBookmark = (userKey?: string) => {
  const { addMessage } = useMessages();
  const queryClient = useQueryClient();
  return useMutation<
    AddBookmarkResponse,
    AxiosError<ErrorRes, AddBookmarkRequest>,
    AddBookmarkRequest
  >([createQueryKey(BOOKMARKS_KEY, userKey)], addBookmark, {
    onMutate: async (): Promise<void> => {
      await queryClient.cancelQueries([BOOKMARKS_KEY]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([BOOKMARKS_KEY]);
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorRes;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
    },
  });
};

const addBookmarksFromFile = async (data: FormData) => {
  const res = await axios.post<
    AddBookmarkFileResponse,
    AxiosResponse<AddBookmarkFileResponse, FormData>,
    FormData
  >(APIURL.BOOKMARKSFILE, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useAddBookmarkFromFile = (userKey?: string) => {
  const queryClient = useQueryClient();
  const { addMessage } = useMessages();
  return useMutation<
    AddBookmarkFileResponse,
    AxiosError<ErrorRes, FormData>,
    FormData
  >(addBookmarksFromFile, {
    onMutate: async (): Promise<void> => {
      await queryClient.cancelQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorRes;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
    },
  });
};

const getAllBookmarks = async () => {
  const res = await axios.get<Folder, AxiosResponse<Folder, null>, null>(
    APIURL.BOOKMARKS,
    { withCredentials: true }
  );
  return res.data;
};

export const useGetBookmarks = (
  userKey?: string,
  onSuccess?: () => void,
  callOnError?: () => void
) => {
  const { addMessage } = useMessages();
  return useQuery<Folder, AxiosError<ErrorRes>>(
    [createQueryKey(BOOKMARKS_KEY, userKey)],
    getAllBookmarks,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess,
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          const errRes = err.response.data as ErrorRes;
          addMessage(`${errRes.title} -- ${errRes.detail}`, true);
        }
        if (callOnError) callOnError();
      },
    }
  );
};
