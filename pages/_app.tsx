import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { AuthProvider } from "../src/hooks/useAuth";
import RouteGuard from "../src/components/RouteGuard";
import Layout from "../src/components/Layout";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../src/mocks/setupMocks").then(({ setupMocks }) => {
    setupMocks();
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <RouteGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RouteGuard>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
