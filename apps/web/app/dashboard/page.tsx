import { getBookshelfCookies, getUser } from "@bookshelf-client/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from ".";

export default async function DashboardPage() {
  try {
    const bookshelfCookies = getBookshelfCookies(cookies());
    const userData = await getUser(bookshelfCookies);
    return <Dashboard userData={userData} />;
  } catch (error) {
    console.log("error: no cookies in request");
    redirect("/signin");
  }
}
