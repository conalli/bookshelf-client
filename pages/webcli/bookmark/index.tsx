import React from "react";
import axios, { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import { ReqURL } from "../../../src/utils/APIEndpoints";
import { Folder } from "../../../src/utils/APITypes";
import BookmarkTable from "../../../src/components/BookmarkTable";

const Bookmark = ({ data }: { data: Folder }) => {
  return (
    <div>
      <BookmarkTable folder={data} />
    </div>
  );
};

export default Bookmark;

export async function getServerSideProps(context: NextPageContext) {
  const folder = context.query.folder ? `/${context.query.folder}` : "";
  const url = ReqURL.base + "/bookmark" + folder;
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
