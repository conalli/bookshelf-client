import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ fontFamily: "var(--font-murecho),var(--font-overpass)" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
