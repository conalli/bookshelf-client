import React from "react";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Error = () => {
  useRefreshTokens();

  return <div>Error occured while processing webcli request</div>;
};

export default Error;
