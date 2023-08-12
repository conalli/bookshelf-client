"use client";

import { BookshelfLogo } from "@bookshelf-client/ui";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

export default function Index() {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <main className="bk-background">
        <div className="mx-auto h-full w-full">
          <BookshelfLogo className={{ main: "h-10 w-20" }} />
        </div>
      </main>
    </ThemeProvider>
  );
}
