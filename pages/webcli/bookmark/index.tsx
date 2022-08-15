import React from "react";
import axios from "axios";
import { NextPageContext } from "next";
import { GetBookmarkRes } from "../../../src/utils/APITypes";
import { ReqURL } from "../../../src/utils/APIEndpoints";

const Bookmark = ({ data }: { data: GetBookmarkRes }) => {
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};

export default Bookmark;

export async function getServerSideProps(context: NextPageContext) {
  try {
    const res = (await axios.get(
      ReqURL.base + "/bookmark/" + context.query.APIKey,
      {
        withCredentials: true,
      }
    )) as GetBookmarkRes;
    return {
      props: { data: res },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { data: "there was an error" },
    };
  }
}
