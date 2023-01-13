import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APIURL } from "../utils/api/endpoints";
import { AddBookmarkFileRes, ErrorRes, Folder } from "../utils/api/types";
import { createErrorMessage } from "../utils/errors";
import { useAuth } from "./useAuth";

export const BOOKMARKS_FILE_FORM_KEY = "bookmarks_file";
const BOOKMARKS_KEY = "bookmarks";

const addBookmarksFromFile = async (data: FormData) => {
  const res = await axios.post<
    AddBookmarkFileRes,
    AxiosResponse<AddBookmarkFileRes, FormData>,
    FormData
  >(APIURL.BOOKMARKSFILE, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useAddBookmarkFromFile = (userID: string | undefined) => {
  const queryClient = useQueryClient();
  const { setErrorMessages } = useAuth();
  return useMutation<AddBookmarkFileRes, AxiosError<ErrorRes>, FormData>(
    addBookmarksFromFile,
    {
      onMutate: async (): Promise<void> => {
        await queryClient.cancelQueries([userID, BOOKMARKS_KEY]);
      },
      onSettled: () => {
        queryClient.invalidateQueries([userID, BOOKMARKS_KEY]);
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
    }
  );
};

const getAllBookmarks = async () => {
  const res = await axios.get<Folder, AxiosResponse<Folder, null>, null>(
    APIURL.BOOKMARKS,
    { withCredentials: true }
  );
  return res.data;
};

export const useGetBookmarks = (
  userID: string,
  onSuccess?: () => void,
  callOnError?: () => void
) => {
  const { setErrorMessages } = useAuth();
  return useQuery<Folder, AxiosError<ErrorRes>>(
    [userID, BOOKMARKS_KEY],
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
