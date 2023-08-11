import { Layout, Providers } from "@bookshelf-client/web/components";
import type { Metadata } from "next";
import { Murecho, Overpass } from "next/font/google";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "Add your bookmarks and manage or access them anywhere.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5bbad5" },
    { media: "(prefers-color-scheme: dark)", color: "#da532c" },
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        url: "/favicon/safari-pinned-tab.svg",
        rel: "mask-icon",
        color: "#5bbad5",
      },
      {
        type: "application/opensearchdescription+xml",
        url: "/opensearch.xml",
        rel: "search",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

const overpass = Overpass({ subsets: ["latin"], variable: "--font-overpass" });
const murecho = Murecho({ subsets: ["latin"], variable: "--font-murecho" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${overpass.variable} ${murecho.variable}`}
    >
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <div id="__next"></div>
      </body>
    </html>
  );
}
