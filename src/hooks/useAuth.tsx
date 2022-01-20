import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ReqURL } from "../utils/APIEndpoints";
import { LogInReq, LogInRes } from "../utils/APITypes";

export type User = {
  id: string;
  name: string;
  password: string;
  apiKey: string;
};

type LogInData = {
  type: "Sign up" | "Log in";
  values: LogInReq;
  setSubmitting: (isSubmitting: boolean) => void;
};

// TODO: Refactor error types + messages
type ErrorType = "Server" | "Sign up" | "Log in" | "Delete Account" | undefined;

type AuthContextType = {
  user: User | null;
  isAuthLoading: boolean;
  isAuthError: boolean;
  errorType: ErrorType;
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
  const [errorType, setErrorType] = useState<ErrorType>(undefined);

  const logIn = useCallback(
    async ({ type, values, setSubmitting }: LogInData): Promise<void> => {
      const reqType = type === "Log in" ? "login" : "signup";
      setIsAuthLoading(true);
      try {
        const res = await axios.post<
          LogInRes,
          AxiosResponse<LogInRes, LogInReq>,
          LogInReq
        >(`${ReqURL.base}${reqType}`, values, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          const { id, apiKey } = res.data;
          setUser(() => ({
            id: id,
            name: values.name.trim(),
            password: values.password.trim(),
            apiKey: apiKey,
          }));
          setIsAuthLoading(false);
          router.push("/dashboard");
        } else {
          setIsAuthError(true);
          setErrorType(type);
          setIsAuthLoading(false);
        }
      } catch (error) {
        setSubmitting(false);
        setIsAuthError(true);
        setErrorType("Server");
        setIsAuthLoading(false);
        console.error(error);
      }
    },
    [router]
  );

  const logOut = useCallback((): void => {
    setUser(null);
    router.push("/");
  }, [router]);

  const delAccount = useCallback(async (): Promise<void> => {
    if (!user) return;
    setIsAuthLoading(true);
    try {
      const res = await axios.delete(`${ReqURL.delAccount}${user.apiKey}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setIsAuthLoading(false);
        setUser(null);
        router.push("/");
      } else {
        setIsAuthError(true);
        setErrorType("Delete Account");
        setIsAuthLoading(false);
      }
    } catch (error) {
      setIsAuthError(true);
      setErrorType("Server");
      setIsAuthLoading(false);
      console.error(error);
    }
  }, [router, user]);

  const memoedValue = useMemo(
    () => ({
      user,
      isAuthLoading,
      isAuthError,
      errorType,
      logIn,
      logOut,
      delAccount,
    }),
    [user, isAuthLoading, isAuthError, errorType, logIn, logOut, delAccount]
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
