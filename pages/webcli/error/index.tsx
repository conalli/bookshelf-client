import { useRefreshTokens } from "@hooks";

const Error = () => {
  useRefreshTokens();

  return (
    <div>
      <h1 className="py-3 text-4xl">WebCLI Error:</h1>
      <h2 className="text-red-500">
        Error occured while processing webcli request
      </h2>
    </div>
  );
};

export default Error;
