import React from "react";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Error = () => {
  const { data: refreshedToken } = useRefreshTokens();
  if (refreshedToken) {
    console.log("tokens refreshed");
  }
  return <div>Error occured while processing webcli request</div>;
};

export default Error;
