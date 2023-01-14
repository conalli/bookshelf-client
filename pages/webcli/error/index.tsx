import React from "react";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";

const Error = () => {
  useRefreshTokens();

  return (
    <div>
      <h1 className="text-4xl py-3">WebCLI Error:</h1>
      <h2 className="text-red-500">
        Error occured while processing webcli request
      </h2>
    </div>
  );
};

export default Error;
