import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ReqURL } from "../utils/APIEndpoints";
import { ErrorRes, LogInReq, LogInRes } from "../utils/APITypes";
import { createErrorMessage } from "../utils/errorMessages";

export type User = {
  id: string;
  name: string;
  password: string;
  APIKey: string;
};

type LogInData = {
  type: "Sign up" | "Log in";
  values: LogInReq;
  setSubmitting: (isSubmitting: boolean) => void;
};

export type ErrorMessage = {
  id: string;
  error: string;
};

type AuthContextType = {
  user: User | null;
  isAuthLoading: boolean;
  isAuthError: boolean;
  errorMessages: ErrorMessage[];
  setErrorMessages: Dispatch<SetStateAction<ErrorMessage[]>>;
  logIn: (data: LogInData) => Promise<void>;
  logOut: () => void;
  delAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([]);

  const logIn = useCallback(
    async ({ type, values, setSubmitting }: LogInData): Promise<void> => {
      const reqType = type === "Log in" ? "login" : "signup";
      setIsAuthLoading(true);
      try {
        const res = await axios.post<
          LogInRes,
          AxiosResponse<LogInRes, LogInReq>,
          LogInReq
        >(`${ReqURL.base}/auth/${reqType}`, values, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          const { id, APIKey } = res.data;
          setUser(() => ({
            id: id,
            name: values.email.trim(),
            password: values.password.trim(),
            APIKey: APIKey,
          }));
          setIsAuthLoading(false);
          router.push("/dashboard");
        } else {
          setIsAuthError(true);
          setErrorMessages((prev) => {
            const msg = `Unexpected ${type} Error: Please check credentials before trying again.`;
            return [...prev, createErrorMessage(msg)];
          });
          setIsAuthLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const errRes = error.response.data as ErrorRes;
          setErrorMessages((prev) => {
            return [...prev, createErrorMessage(errRes.error)];
          });
        }
        setSubmitting(false);
        setIsAuthError(true);
        setIsAuthLoading(false);
      }
    },
    [router]
  );

  const logOut = useCallback((): void => {
    setUser(null);
    router.replace("/");
  }, [router]);

  const delAccount = useCallback(async (): Promise<void> => {
    if (!user) return;
    setIsAuthLoading(true);
    try {
      const res = await axios.delete(`${ReqURL.base}/${user.APIKey}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setIsAuthLoading(false);
        setUser(null);
        router.push("/");
      } else {
        setIsAuthError(true);
        setErrorMessages((prev) => {
          const msg = `Unexpected Error While trying to Delete ${user.name}'s Account: Please check credentials before trying again.`;
          return [...prev, createErrorMessage(msg)];
        });
        setIsAuthLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errRes = error.response.data as ErrorRes;
        setErrorMessages((prev) => {
          return [...prev, createErrorMessage(errRes.error)];
        });
      }
      setIsAuthError(true);
      setIsAuthLoading(false);
    }
  }, [router, user]);

  const memoedValue = useMemo(
    () => ({
      user,
      isAuthLoading,
      isAuthError,
      errorMessages,
      setErrorMessages,
      logIn,
      logOut,
      delAccount,
    }),
    [user, isAuthLoading, isAuthError, errorMessages, logIn, logOut, delAccount]
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
