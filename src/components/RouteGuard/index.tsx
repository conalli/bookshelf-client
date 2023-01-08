import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import LoadingPage from "../LoadingPage";
import { useUser } from "../../hooks/useUser";

type RouteGuardProps = {
  children: ReactNode;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser, isAuthLoading, isAuthError } = useAuth();
  const { data, isLoading, isError } = useUser();
  const queryClient = useQueryClient();

  const checkAuth = useCallback(
    (currentRoute: string) => {
      const protectedPath = "/dashboard";
      if (user) {
        setIsAuthenticated(true);
      }
      if (data) {
        setUser(data);
        setIsAuthenticated(true);
      }
      if (
        (!user && !isAuthLoading && currentRoute === protectedPath) ||
        (!user && isAuthError && currentRoute === protectedPath) ||
        (!data && !isLoading && currentRoute === protectedPath) ||
        (!data && isError && currentRoute === protectedPath)
      ) {
        setIsAuthenticated(false);
        router.push("/signin");
      }
    },
    [
      data,
      isAuthError,
      isAuthLoading,
      isError,
      isLoading,
      router,
      setUser,
      user,
    ]
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
  }, [checkAuth, queryClient, router.asPath, router.events, user.id]);
  if (!isAuthenticated) return null;
  if (isAuthLoading || isLoading) return <LoadingPage />;
  return isAuthenticated && <>{children}</>;
};

export default RouteGuard;
