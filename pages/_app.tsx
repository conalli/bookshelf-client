import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { ThemeProvider } from "next-themes";
import { ReactElement, ReactNode, useState } from "react";
import { AuthProvider } from "../src/hooks/useAuth";
import Layout from "../src/components/Layout";
import { NextPage } from "next";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../src/mocks/setupMocks").then(({ setupMocks }) => {
    setupMocks();
  });
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
