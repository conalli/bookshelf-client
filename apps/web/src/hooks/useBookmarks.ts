import { selectedBookmarkAtom } from "@store/bookmark";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIURL } from "@utils/api/endpoints";
import type {
  AddBookmarkFileResponse,
  AddBookmarkRequest,
  AddBookmarkResponse,
  DeleteBookmarkResponse,
  ErrorResponse,
  Folder,
} from "@utils/api/types";
import { createQueryKey, exponentialBackoff } from "@utils/query/helpers";
import type { AxiosError, AxiosResponse } from "axios";
import axios, { isAxiosError } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useMessages } from "./useMessages";

export const BOOKMARKS_FILE_FORM_KEY = "bookmarks_file";
export const BOOKMARKS_KEY = "bookmarks";

export const useSelectBookmark = () => {
  const selectedBookmark = useAtomValue(selectedBookmarkAtom);
  const setSelectedBookmark = useSetAtom(selectedBookmarkAtom);
  return { selectedBookmark, setSelectedBookmark };
};

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
    AxiosError<ErrorResponse, AddBookmarkRequest>,
    AddBookmarkRequest
  >({
    mutationFn: addBookmark,
    onMutate: async (): Promise<void> => {
      await queryClient.cancelQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorResponse;
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
    AxiosError<ErrorResponse, FormData>,
    FormData
  >({
    mutationFn: addBookmarksFromFile,
    onMutate: async (): Promise<void> => {
      await queryClient.cancelQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorResponse;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
    },
  });
};

const deleteBookmark = async (id: string) => {
  const res = await axios.delete<
    DeleteBookmarkResponse,
    AxiosResponse<DeleteBookmarkResponse, null>,
    null
  >(`${APIURL.BOOKMARKS}/${id}`, { withCredentials: true });
  return res.data;
};

const removeBookmarkFromFolder = (
  curr: Folder,
  id: string,
  found = false
): Folder => {
  if (found) return curr;
  if (curr.bookmarks) {
    const currBookmarks = curr.bookmarks.filter((b) => {
      if (b.id === id) found = true;
      return b.id !== id;
    });
    if (found) curr.bookmarks = currBookmarks;
  }
  if (!curr.folders) return curr;
  for (let f of curr.folders) {
    f = removeBookmarkFromFolder(f, id, found);
  }
  return curr;
};

export const useDeleteBookmark = (userKey?: string) => {
  const queryClient = useQueryClient();
  const { addMessage } = useMessages();
  return useMutation<
    DeleteBookmarkResponse,
    AxiosError<ErrorResponse, null>,
    string
  >({
    mutationFn: deleteBookmark,
    onMutate: async (id): Promise<void> => {
      await queryClient.cancelQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
      queryClient.setQueryData<Folder>(
        [createQueryKey(BOOKMARKS_KEY, userKey)],
        (prevData) => {
          if (!prevData) return;
          return removeBookmarkFromFolder(prevData, id);
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries([createQueryKey(BOOKMARKS_KEY, userKey)]);
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorResponse;
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
  return useQuery<Folder, AxiosError<ErrorResponse>>({
    queryKey: [createQueryKey(BOOKMARKS_KEY, userKey)],
    queryFn: getAllBookmarks,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryDelay: exponentialBackoff,
    onSuccess,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        const errRes = err.response.data as ErrorResponse;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
      if (callOnError) callOnError();
    },
  });
};
