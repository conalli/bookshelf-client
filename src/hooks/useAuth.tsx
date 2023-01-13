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
import { APIURL } from "../utils/api/endpoints";
import { AuthRequestData, ErrorRes, User } from "../utils/api/types";
import { useMessages } from "./useMessages";
import { AuthRequest } from "./useUser";

type AuthContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isAuthLoading: boolean;
  isAuthError: boolean;
  logIn: (data: AuthRequest) => Promise<void>;
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
  const { addMessage } = useMessages();
  const logIn = useCallback(
    async ({ type, data, setSubmitting }: AuthRequest): Promise<void> => {
      const reqType = type === "Sign in" ? "login" : "signup";
      setIsAuthLoading(true);
      try {
        const res = await axios.post<
          User,
          AxiosResponse<User, AuthRequestData>,
          AuthRequestData
        >(`${APIURL.BASE}/auth/${reqType}`, data, {
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
          const msg = `Unexpected ${type} Error: Please check credentials before trying again.`;
          addMessage(msg, true);
          setIsAuthLoading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const errRes = error.response.data as ErrorRes;
          addMessage(`${errRes.title}`, true);
        } else {
          const msg = `Unexpected ${type} Error: Please check credentials before trying again.`;
          addMessage(msg, true);
        }
        setSubmitting(false);
        setIsAuthError(true);
        setIsAuthLoading(false);
      }
    },
    [addMessage, router]
  );

  const logOut = useCallback(async (): Promise<void> => {
    setIsAuthLoading(true);
    try {
      const res = await axios.post(`${APIURL.BASE}/auth/logout`, null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser({} as User);
        setIsAuthLoading(false);
        router.replace("/");
      } else {
        setIsAuthLoading(false);
        setIsAuthError(true);
        router.replace("/404");
      }
    } catch (error) {
      setUser({} as User);
      setIsAuthLoading(false);
      setIsAuthError(true);
      router.replace("/404");
    }
  }, [router]);

  const delAccount = useCallback(async (): Promise<void> => {
    if (!user) return;
    setIsAuthLoading(true);
    try {
      const res = await axios.delete(`${APIURL.BASE}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        setIsAuthLoading(false);
        setUser({} as User);
        router.push("/");
      } else {
        setIsAuthError(true);
        const msg = `Unexpected Error While trying to Delete ${user.name}'s Account: Please check credentials before trying again.`;
        addMessage(msg, true);
        setIsAuthLoading(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errRes = error.response.data as ErrorRes;
        addMessage(`${errRes.title} -- ${errRes.detail}`, true);
      }
      setIsAuthError(true);
      setIsAuthLoading(false);
    }
  }, [addMessage, router, user]);

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      isAuthLoading,
      isAuthError,
      logIn,
      logOut,
      delAccount,
    }),
    [user, setUser, isAuthLoading, isAuthError, logIn, logOut, delAccount]
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
