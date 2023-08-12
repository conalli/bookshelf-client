import { getBookshelfCookies, getUser } from "@bookshelf-client/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Command from ".";

export default async function CommandPage() {
  try {
    const bookshelfCookies = getBookshelfCookies(cookies());
    const userData = await getUser(bookshelfCookies);
    return <Command userData={userData} />;
  } catch (error) {
    console.log(error);
    redirect("/webcli/error");
  }
}
