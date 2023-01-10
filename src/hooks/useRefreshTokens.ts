import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReqURL } from "../utils/APIEndpoints";
import { ErrorRes } from "../utils/APITypes";

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
    let interval: NodeJS.Timer;
    try {
      interval = setInterval(refreshTokens, 1000 * 60 * 7);
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
