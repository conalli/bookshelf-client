import React from "react";
import { Folder, User } from "../../../src/utils/api/types";
import BookmarkTable from "../../../src/components/BookmarkTable";
import { useRefreshTokens } from "../../../src/hooks/useRefreshTokens";
import { useGetUser } from "../../../src/hooks/useUser";
import { getUserAndBookmarksOrRedirect } from "../../../src/utils/api/props";

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
      <h1 className="text-4xl py-3">WebCLI Bookmarks:</h1>
      <BookmarkTable folder={folderData} isLoading={false} isError={false} />
    </div>
  );
};

export default Bookmark;
