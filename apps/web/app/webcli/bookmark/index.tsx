"use client";

import { useGetUser, useRefreshTokens } from "@bookshelf-client/hooks";
import type { Folder, User } from "@bookshelf-client/utils";
import { getUserAndBookmarksOrRedirect } from "@bookshelf-client/utils";
import { BookmarkTable } from "@bookshelf-client/web/components";

export const getServerSideProps = getUserAndBookmarksOrRedirect;

type BookmarkProps = {
  userData: User;
  folderData: Folder;
};

export default function Bookmark({ userData, folderData }: BookmarkProps) {
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
}
