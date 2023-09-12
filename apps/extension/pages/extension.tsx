import { WEB_URL } from "@bookshelf-client/extension/utils";
import { Button } from "@bookshelf-client/ui/server";
import { ThemeProvider } from "next-themes";

export default function Index() {
  console.log("URL", WEB_URL);
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <main className="bk-background h-[480px] w-[360px]">
        <div className="flex h-[480px] w-[360px] flex-col items-center justify-center gap-4">
          <Button
            onClick={() =>
              // chrome.tabs.create({
              //   active: true,
              //   url: `${WEB_URL}/signin?from=extension`,
              // })
              // window.open(
              //   `${WEB_URL}/signin?from=extension`,
              //   "_blank",
              //   "popup,width=500,height=500"
              // )
              console.log("hello")
            }
          >
            Sign in
          </Button>
          <Button
            variant={"secondary"}
            onClick={() =>
              chrome.tabs.create({
                active: true,
                url: `${WEB_URL}/signup?from=extension`,
              })
            }
          >
            Sign up
          </Button>
        </div>
      </main>
    </ThemeProvider>
  );
}
