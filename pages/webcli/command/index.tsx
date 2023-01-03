import React from "react";
import axios from "axios";
import { NextPageContext } from "next";
import { GetCMDRes } from "../../../src/utils/APITypes";

// TODO: FIX THIS
const Command = ({ data }: { data: GetCMDRes }) => {
  return <div>{JSON.stringify(data)}</div>;
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const data = (await axios.get(
      "http://localhost:8080/api/user/command/" + context.query.APIKey,
      {
        withCredentials: true,
      }
    )) as GetCMDRes;
    console.log("DATA: ", data);
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
    return { props: { data: "none" } };
  }
}

export default Command;
