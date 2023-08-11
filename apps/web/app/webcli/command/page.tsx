import { getBookshelfCookies, getUser } from "@bookshelf-client/utils";
import { cookies } from "next/headers";
import Command from ".";

export default async function CommandPage() {
  try {
    const bookshelfCookies = getBookshelfCookies(cookies());
    const userData = await getUser(bookshelfCookies);
    return <Command userData={userData} />;
  } catch (error) {
    console.log(error);
  }
}
