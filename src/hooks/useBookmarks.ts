import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIURL } from "../utils/api/endpoints";
import {
  AddBookmarkFileResponse,
  AddBookmarkRequest,
  AddBookmarkResponse,
  ErrorRes,
  Folder,
} from "../utils/api/types";
import { createErrorMessage } from "../utils/errors";
import { useAuth } from "./useAuth";

export const BOOKMARKS_FILE_FORM_KEY = "bookmarks_file";
const BOOKMARKS_KEY = "bookmarks";

const addBookmark = async (data: AddBookmarkRequest) => {
  const res = await axios.post<
    AddBookmarkResponse,
    AxiosResponse<AddBookmarkResponse, AddBookmarkRequest>,
    AddBookmarkRequest
  >(APIURL.BOOKMARKS, data, { withCredentials: true });
  return res.data;
};

export const useAddBookmark = () => {
  const { setErrorMessages } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<
    AddBookmarkResponse,
    AxiosError<ErrorRes, AddBookmarkRequest>,
    AddBookmarkRequest
  >([BOOKMARKS_KEY], addBookmark, {
    onMutate: async (): Promise<void> => {
      await queryClient.cancelQueries([BOOKMARKS_KEY]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([BOOKMARKS_KEY]);
    },
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

export const useAddBookmarkFromFile = () => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<
    AddBookmarkFileResponse,
    AxiosError<ErrorRes, FormData>,
    FormData
  >(addBookmarksFromFile, {
    onMutate: async (): Promise<void> => {
      await queryClient.cancelQueries([BOOKMARKS_KEY]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([BOOKMARKS_KEY]);
    },
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
  onSuccess?: () => void,
  callOnError?: () => void
) => {
  const { setErrorMessages } = useAuth();
  return useQuery<Folder, AxiosError<ErrorRes>>(
    [BOOKMARKS_KEY],
    getAllBookmarks,
    {
      refetchOnMount: false,
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
    }
  );
};
