import { WEB_URL } from "@bookshelf-client/extension/utils";
import { ThemeProvider } from "next-themes";

export default function Index() {
  console.log("URL", WEB_URL);
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <main className="bk-background h-[480px] w-[360px]">
        <div className="flex h-[480px] w-[360px] items-center justify-center">
          {/* <BookshelfLogo className={{ main: "h-10 w-20" }} /> */}
          {/* <Loading /> */}
          <button
            onClick={() =>
              // chrome.tabs.create({
              //   active: true,
              //   url: `${WEB_URL}/signin?from=extension`,
              // })
              window.open(
                `${WEB_URL}/signin?from=extension`,
                "_blank",
                "popup,width=500,height=500",
              )
            }
          >
            Sign in
          </button>
          <button
            onClick={() =>
              chrome.tabs.create({
                active: true,
                url: `${WEB_URL}/signup?from=extension`,
              })
            }
          >
            Sign up
          </button>
        </div>
      </main>
    </ThemeProvider>
  );
}
