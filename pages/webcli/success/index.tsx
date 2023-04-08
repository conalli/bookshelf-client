import { useRefreshTokens } from "@hooks";

const Success = () => {
  useRefreshTokens();

  return <div>Success</div>;
};

export default Success;
