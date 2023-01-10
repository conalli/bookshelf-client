import React from "react";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Success = () => {
  const refreshErrors = useRefreshTokens();
  if (refreshErrors.length) {
    console.error(...refreshErrors);
  }
  return <div>Success</div>;
};

export default Success;
