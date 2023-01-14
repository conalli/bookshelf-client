import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { APIURL } from "./endpoints";
import { Folder, User } from "./types";

export const getUserOrRedirect: GetServerSideProps<{ userData: User }> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { data } = await axios.get<User>(APIURL.USER, {
      withCredentials: true,
      headers: {
        Cookie: context.req?.headers.cookie,
      },
    });
    return {
      props: { userData: data },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
};

export const getUserAndBookmarksOrRedirect: GetServerSideProps<{
  userData: User;
  folderData: Folder;
}> = async (context: GetServerSidePropsContext) => {
  const folder = context.query.folder ? `/${context.query.folder}` : "";
  const url = APIURL.BOOKMARKS + folder;
  try {
    const u = axios.get<User, AxiosResponse<User, null>, null>(APIURL.USER, {
      withCredentials: true,
      headers: {
        Cookie: context.req?.headers.cookie,
      },
    });
    const f = axios.get<Folder, AxiosResponse<Folder, null>, null>(url, {
      withCredentials: true,
      headers: {
        Cookie: context.req?.headers.cookie,
      },
    });
    const [{ data: userData }, { data: folderData }] = await Promise.all([
      u,
      f,
    ]);
    return {
      props: { userData, folderData },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
};

export const getUserIfPossible: GetServerSideProps<{
  userData: User | null;
}> = async (context: GetServerSidePropsContext) => {
  try {
    const { data } = await axios.get<User>(APIURL.USER, {
      withCredentials: true,
      headers: {
        Cookie: context.req?.headers.cookie,
      },
    });
    return {
      props: { userData: data },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { userData: null },
    };
  }
};
