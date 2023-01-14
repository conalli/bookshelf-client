import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useAuthStatus } from "../../hooks/useAuth";

type RouteGuardProps = {
  children: ReactNode;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const status = useAuthStatus();

  if (status && !status.success) {
    router.push("/signin");
  }

  return <>{children}</>;
};

export default RouteGuard;
