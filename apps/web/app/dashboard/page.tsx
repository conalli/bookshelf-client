import { getBookshelfCookies, getUser } from "@bookshelf-client/utils";
import { cookies } from "next/headers";
import Dashboard from ".";

export default async function DashboardPage() {
  try {
    const bookshelfCookies = getBookshelfCookies(cookies());
    const userData = await getUser(bookshelfCookies);
    return <Dashboard userData={userData} />;
  } catch (error) {
    console.log("omg");
    console.log(error);
  }
}
