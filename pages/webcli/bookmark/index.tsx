import React from "react";
import axios, { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { APIURL } from "../../../src/utils/APIEndpoints";
import { Folder } from "../../../src/utils/APITypes";
import BookmarkTable from "../../../src/components/BookmarkTable";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Bookmark = ({ data }: { data: Folder }) => {
  const refreshErrors = useRefreshTokens();
  if (refreshErrors.length) {
    console.error(...refreshErrors);
  }
  return (
    <div>
      <BookmarkTable folder={data} />
    </div>
  );
};

export default Bookmark;

export async function getServerSideProps(context: NextPageContext) {
  const folder = context.query.folder ? `/${context.query.folder}` : "";
  const url = APIURL.base + "/bookmark" + folder;
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
