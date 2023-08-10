import type { Metadata } from "next";
import SignIn from ".";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Create an account or log into Bookshelf. Add your bookmarks and then manage or access them anywhere.",
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

export default function SignInPage() {
  return <SignIn />;
}
