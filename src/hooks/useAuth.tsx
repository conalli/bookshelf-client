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
import { SignInFormVariant } from "../components/SignInForm";
import { ReqURL } from "../utils/APIEndpoints";
import { ErrorRes, LogInReq, User } from "../utils/APITypes";
import { createErrorMessage } from "../utils/errorMessages";

type LogInData = {
  type: SignInFormVariant;
  values: LogInReq;
  setSubmitting: (isSubmitting: boolean) => void;
};

export type ErrorMessage = {
  id: string;
  error: string;
};

type AuthContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
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
  const [user, setUser] = useState<User>({} as User);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([]);

  const logIn = useCallback(
    async ({ type, values, setSubmitting }: LogInData): Promise<void> => {
      const reqType = type === "Sign in" ? "login" : "signup";
      setIsAuthLoading(true);
      try {
        const res = await axios.post<
          User,
          AxiosResponse<User, LogInReq>,
          LogInReq
        >(`${ReqURL.base}/auth/${reqType}`, values, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          const user = res.data as User;
          setUser(() => user);
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

  const logOut = useCallback(async (): Promise<void> => {
    setIsAuthLoading(true);
    try {
      const res = await axios.post(`${ReqURL.base}/auth/logout`, null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser({} as User);
        setIsAuthLoading(false);
        router.replace("/");
      } else {
        setIsAuthLoading(false);
        setIsAuthError(true);
        console.error("error: ", res);
        router.replace("/404");
      }
    } catch (error) {
      setIsAuthLoading(false);
      setIsAuthError(true);
      console.error(error);
      router.replace("/404");
    }
  }, [router]);

  const delAccount = useCallback(async (): Promise<void> => {
    if (!user) return;
    setIsAuthLoading(true);
    try {
      const res = await axios.delete(`${ReqURL.base}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setIsAuthLoading(false);
        setUser({} as User);
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
      setUser,
      isAuthLoading,
      isAuthError,
      errorMessages,
      setErrorMessages,
      logIn,
      logOut,
      delAccount,
    }),
    [
      user,
      setUser,
      isAuthLoading,
      isAuthError,
      errorMessages,
      logIn,
      logOut,
      delAccount,
    ]
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
