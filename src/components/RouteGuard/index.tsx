import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LoadingPage from "../LoadingPage";

type RouteGuardProps = {
  children: ReactNode;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, isAuthLoading, isAuthError } = useAuth();

  const checkAuth = useCallback(
    (currentRoute: string) => {
      const protectedPath = "/dashboard";
      if (
        (!user && !isAuthLoading && currentRoute === protectedPath) ||
        (!user && isAuthError && currentRoute === protectedPath)
      ) {
        setIsAuthenticated(false);
        router.push("/signin");
      } else {
        setIsAuthenticated(true);
      }
    },
    [isAuthError, isAuthLoading, router, user]
  );

  useEffect(() => {
    checkAuth(router.asPath);
    const hideContent = () => setIsAuthenticated(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", checkAuth);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [checkAuth, router.asPath, router.events]);
  if (!isAuthenticated) return null;
  if (isAuthLoading && !isAuthenticated) return <LoadingPage />;
  return isAuthenticated && <>{children}</>;
};

export default RouteGuard;
