import BookmarkTable from "../../../src/components/dashboard/BookmarkTable";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";
import { useGetUser } from "../../../src/hooks/useUser";
import { getUserAndBookmarksOrRedirect } from "../../../src/utils/api/props";
import { Folder, User } from "../../../src/utils/api/types";

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
