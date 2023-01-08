import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReqURL } from "../utils/APIEndpoints";

const refreshTokens = () => {
  axios.post<null, AxiosResponse<null, null>, null>(
    `${ReqURL.base}/auth/refresh`,
    null,
    {
      withCredentials: true,
    }
  );
};

export const useRefreshTokens = () => {
  const [refreshErrors, setRefreshErrors] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        refreshTokens();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const err = error as AxiosError<null, null>;
          if (err.name !== undefined) {
            setRefreshErrors((prev) => [...prev, err.name]);
          }
        }
        router.push("/signin");
      }
    }, 1000 * 60 * 7);
    return () => {
      clearInterval(interval);
    };
  }, [router]);
  return refreshErrors;
};
