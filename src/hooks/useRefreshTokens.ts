import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APIURL } from "../utils/APIEndpoints";
import { ErrorRes } from "../utils/APITypes";

const refreshTokens = () => {
  axios.post<null, AxiosResponse<null, null>, null>(
    `${APIURL.base}/auth/refresh`,
    null,
    {
      withCredentials: true,
    }
  );
};

const REFRESH_INTERVAL = 1000 * 60 * 9;

export const useRefreshTokens = () => {
  const [refreshErrors, setRefreshErrors] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    let interval: NodeJS.Timer;
    try {
      interval = setInterval(refreshTokens, REFRESH_INTERVAL);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ErrorRes, null>;
        if (err.response !== undefined) {
          setRefreshErrors((prev) => [
            ...prev,
            `${err.response?.data.title} -- ${err.response?.data.detail}`,
          ]);
        }
      }
      router.push("/signin");
    }
    return () => {
      clearInterval(interval);
    };
  }, [router]);
  return refreshErrors;
};
