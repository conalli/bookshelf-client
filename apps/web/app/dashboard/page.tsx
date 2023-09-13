import { getBookshelfCookies, getUser } from "@bookshelf-client/api";
import type { DashboardTab } from "@bookshelf-client/web/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from ".";

type SearchParams = { [key: string]: string | string[] | undefined };

function getMenuOption(s: SearchParams): DashboardTab {
  const m = s.tab || "commands";
  if (Array.isArray(m)) return getMenuOption({ menu: m[0] });
  switch (m) {
    case "commands":
      return "Commands";
    case "bookmarks":
      return "Bookmarks";
    case "setup":
      return "Setup";
    default:
      return "Commands";
  }
}

type DashboardPageProps = {
  searchParams: SearchParams;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const selectedMenuOption = getMenuOption(searchParams);
  console.log("s", selectedMenuOption);
  try {
    const bookshelfCookies = getBookshelfCookies(cookies());
    const userData = await getUser(bookshelfCookies);
    return <Dashboard userData={userData} currentTab={selectedMenuOption} />;
  } catch (error) {
    console.log("error: no cookies in request");
    redirect("/signin");
  }
}
