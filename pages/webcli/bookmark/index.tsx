import React from "react";
import axios, { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { APIURL } from "../../../src/utils/api/endpoints";
import { Folder } from "../../../src/utils/api/types";
import BookmarkTable from "../../../src/components/BookmarkTable";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Bookmark = ({ data }: { data: Folder }) => {
  useRefreshTokens();

  return (
    <div>
      <BookmarkTable folder={data} isLoading={false} isError={false} />
    </div>
  );
};

export default Bookmark;

export async function getServerSideProps(context: NextPageContext) {
  const folder = context.query.folder ? `/${context.query.folder}` : "";
  const url = APIURL.BOOKMARKS + folder;
  try {
    const res = await axios.get<Folder, AxiosResponse<Folder, null>, null>(
      url,
      {
        withCredentials: true,
        headers: {
          Cookie: context.req?.headers.cookie,
        },
      }
    );
    return {
      props: { data: res.data },
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
}
