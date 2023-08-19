import { WEB_URL } from "@bookshelf-client/extension/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  console.log("ENV", WEB_URL);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
