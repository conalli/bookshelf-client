import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRouter, useRouter } from "next/router";
import { SignInFormVariant } from "../components/SignInForm";
import { APIURL } from "../utils/api/endpoints";
import { ErrorRes, User, AuthRequestData } from "../utils/api/types";
import { createErrorMessage } from "../utils/errors";
import { useAuth } from "./useAuth";

export const USER_KEY = "user";

const getUser = async () => {
  const res = await axios.get<User, AxiosResponse<User, null>, null>(
    APIURL.USER,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const useUserErrorHandler = (router: NextRouter, retries = 3) => {
  let errCount = 0;
  return () => {
    errCount++;
    if (errCount >= retries) {
      router.push("/signin");
    }
  };
};

export const useUser = ({
  onSuccess,
  callOnError,
}: { onSuccess?: () => void; callOnError?: () => void } = {}) => {
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

export type AuthRequest = {
  type: SignInFormVariant;
  data: AuthRequestData;
  setSubmitting: (isSubmitting: boolean) => void;
};

const auth = async ({ type, data }: AuthRequest): Promise<User> => {
  const reqType = type === "Sign in" ? "login" : "signup";
  const res = await axios.post<
    User,
    AxiosResponse<User, AuthRequestData>,
    AuthRequestData
  >(`${APIURL.AUTH}/${reqType}`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};

export const useUserAuth = () => {
  const { setErrorMessages } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation([USER_KEY], auth, {
    onSuccess: (): void => {
      router.push("/");
    },
    onMutate: async ({ setSubmitting }): Promise<void> => {
      setSubmitting(true);
      await queryClient.cancelQueries([USER_KEY]);
    },
    onSettled: (_data, _err, { setSubmitting }): void => {
      setSubmitting(false);
      queryClient.invalidateQueries([USER_KEY]);
    },
    onError: (error): void => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errRes = error.response.data as ErrorRes;
        setErrorMessages((prev) => {
          return [...prev, createErrorMessage(`${errRes.title}`)];
        });
      }
    },
  });
};
