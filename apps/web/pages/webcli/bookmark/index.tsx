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
    <div className="flex w-full flex-col px-8">
      <h1 className="py-3 text-4xl">WebCLI Bookmarks:</h1>
      <div className="w-full">
        <BookmarkTable folder={folderData} isLoading={false} isError={false} />
      </div>
    </div>
  );
};

export default Bookmark;
