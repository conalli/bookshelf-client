"use client";

import {
  APIURL,
  AuthRequest,
  ErrorResponse,
  User,
} from "@bookshelf-client/api";
import type { AuthStatus } from "@bookshelf-client/store";
import { statusAtom } from "@bookshelf-client/store";
import type { SignInFormVariant } from "@bookshelf-client/utils";
import { USER_KEY } from "@bookshelf-client/utils";
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import axios, { isAxiosError } from "axios";
import type { SetStateAction } from "jotai";
import { useAtomValue, useSetAtom } from "jotai";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useMessages } from "./useMessages";
import { useRemoveUser } from "./useUser";

export type AuthRequestData = {
  data: AuthRequest;
  setSubmitting: (isSubmitting: boolean) => void;
  from?: string | null
};

type AuthRequestWithType = AuthRequestData & {
  type: SignInFormVariant;
};

const auth = async ({ type, data }: AuthRequestWithType): Promise<User> => {
  const reqType = type === "Sign in" ? "login" : "signup";
  const res = await axios.post<
    User,
    AxiosResponse<User, AuthRequest>,
    AuthRequest
  >(`${APIURL.AUTH}/${reqType}`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};

const signUp = ({ data, setSubmitting }: AuthRequestData) =>
  auth({ type: "Sign up", data, setSubmitting });

const logIn = ({ data, setSubmitting }: AuthRequestData) =>
  auth({ type: "Sign in", data, setSubmitting });

const logout = async () => {
  const res = await axios.post<null, AxiosResponse<null, null>, null>(
    `${APIURL.AUTH}/logout`,
    null,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const authRequest = (
  mutationFn: MutationFunction<User, AuthRequestData>,
  queryClient: QueryClient,
  router: AppRouterInstance,
  setAuthStatus: (update: SetStateAction<AuthStatus | null>) => void,
  addMessage: (message: string, isError?: boolean) => void
): UseMutationOptions<
  User,
  AxiosError<ErrorResponse, AuthRequest>,
  AuthRequestData,
  void
> => ({
  mutationKey: [USER_KEY],
  mutationFn,
  onSuccess: (_data, {from}): void => {
    setAuthStatus({ success: true, loading: false, error: false });
    from === "extension" ? window.close() : router.push("/dashboard");
  },
  onMutate: async ({ setSubmitting }): Promise<void> => {
    setAuthStatus({ success: false, loading: true, error: false });
    setSubmitting(true);
    await queryClient.cancelQueries([USER_KEY]);
  },
  onSettled: (_data, _err, { setSubmitting }): void => {
    setSubmitting(false);
    queryClient.invalidateQueries([USER_KEY]);
  },
  onError: (error): void => {
    setAuthStatus({ success: false, loading: false, error: true });
    if (isAxiosError(error) && error.response?.data) {
      const errRes = error.response.data as ErrorResponse;
      addMessage(`${errRes.title}`, true);
    } else {
      addMessage("Unknown auth error, check credentials and try again", true);
    }
  },
});

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setAuthStatus = useSetAtom(statusAtom);
  const removeUser = useRemoveUser();
  const { addMessage } = useMessages();
  const status = useAtomValue(statusAtom);
  const setStatus = useSetAtom(statusAtom);

  const signUpOptions = useCallback(
    () => authRequest(signUp, queryClient, router, setAuthStatus, addMessage),
    [addMessage, queryClient, router, setAuthStatus]
  );
  const signInOptions = useCallback(
    () => authRequest(logIn, queryClient, router, setAuthStatus, addMessage),
    [addMessage, queryClient, router, setAuthStatus]
  );

  const signOut = useMutation([USER_KEY], logout, {
    onSuccess: () => {
      setAuthStatus(null);
      removeUser();
      router.replace("/");
    },
    onMutate: async () => {
      setAuthStatus(null);
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.data) {
        const errRes = error.response.data as ErrorResponse;
        addMessage(`${errRes.title}`, true);
      } else {
        addMessage("Unknown error while attempting to logout", true);
      }
      setAuthStatus({ success: true, loading: false, error: false });
    },
  });
  return {
    status,
    setStatus,
    signUp: useMutation(signUpOptions()),
    signIn: useMutation(signInOptions()),
    signOut,
  };
};
