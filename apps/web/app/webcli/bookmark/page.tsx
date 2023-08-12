import { getBookshelfCookies, getFolder, getUser } from "@bookshelf-client/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Bookmark from ".";

export default async function BookmarkPage() {
  try {
    const bookshelfCookies = getBookshelfCookies(cookies());
    const u = getUser(bookshelfCookies);
    const f = getFolder(bookshelfCookies);
    const [userData, folderData] = await Promise.all([u, f]);
    return <Bookmark userData={userData} folderData={folderData} />;
  } catch (error) {
    console.log(error);
    redirect("/webcli/error");
  }
}
