import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { formatCookies } from "./cookies";
import { APIURL } from "./endpoints";
import { Folder, User } from "./types";

export const getUser = async (cookies?: RequestCookie[]) => {
  const options: AxiosRequestConfig = {
    withCredentials: true,
  };
  if (cookies) {
    options["headers"] = {
      Cookie: formatCookies(cookies),
    };
  }
  const res = await axios.get<User, AxiosResponse<User, null>, null>(
    APIURL.USER,
    options
  );
  return res.data;
};

export const getFolder = async (cookies?: RequestCookie[]) => {
  const options: AxiosRequestConfig = {
    withCredentials: true,
  };
  if (cookies) {
    options["headers"] = {
      Cookie: formatCookies(cookies),
    };
  }
  const res = await axios.get<Folder, AxiosResponse<Folder, null>, null>(
    APIURL.BOOKMARKS,
    options
  );
  return res.data;
};
