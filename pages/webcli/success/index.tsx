import React from "react";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Success = () => {
  const { data: refreshedToken } = useRefreshTokens();
  if (refreshedToken) {
    console.log("tokens refreshed");
  }
  return <div>Success</div>;
};

export default Success;
