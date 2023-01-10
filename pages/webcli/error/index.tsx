import React from "react";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Error = () => {
  const refreshErrors = useRefreshTokens();
  if (refreshErrors.length) {
    console.error(...refreshErrors);
  }
  return <div>Error occured while processing webcli request</div>;
};

export default Error;
