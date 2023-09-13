import { getBookshelfCookies, getFolder, getUser } from "@bookshelf-client/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Bookmark from ".";

export default async function BookmarkPage() {
  try {
    const cookieData = cookies();
    const bookshelfCookies = getBookshelfCookies(cookieData);
    const [userData, folderData] = await Promise.all([
      getUser(bookshelfCookies),
      getFolder(bookshelfCookies),
    ]);
    return <Bookmark userData={userData} folderData={folderData} />;
  } catch (error) {
    console.log(error);
    redirect("/webcli/error");
  }
}
