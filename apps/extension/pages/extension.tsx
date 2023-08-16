import { Loading } from "@bookshelf-client/ui";
import { ThemeProvider } from "next-themes";

export default function Index() {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <main className="bk-background h-[480px] w-[360px]">
        <div className="flex h-[480px] w-[360px] items-center justify-center">
          {/* <BookshelfLogo className={{ main: "h-10 w-20" }} /> */}
          <Loading />
        </div>
      </main>
    </ThemeProvider>
  );
}
