import { BookmarkTable } from "@components/dashboard";
import { useGetUser, useRefreshTokens } from "@hooks";
import { getUserAndBookmarksOrRedirect } from "@utils/api/props";
import type { Folder, User } from "@utils/api/types";

export const getServerSideProps = getUserAndBookmarksOrRedirect;

const Bookmark = ({
  userData,
  folderData,
}: {
  userData: User;
  folderData: Folder;
}) => {
  useGetUser(userData.api_key);
  useRefreshTokens(userData.api_key);

  return (
    <div>
      <h1 className="py-3 text-4xl">WebCLI Bookmarks:</h1>
      <BookmarkTable folder={folderData} isLoading={false} isError={false} />
    </div>
  );
};

export default Bookmark;
