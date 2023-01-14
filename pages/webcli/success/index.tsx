import React from "react";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Success = () => {
  useRefreshTokens();

  return <div>Success</div>;
};

export default Success;
