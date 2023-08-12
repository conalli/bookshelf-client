"use client";

import type { Folder, User } from "@bookshelf-client/api";
import { useGetUser, useRefreshTokens } from "@bookshelf-client/hooks";
import { BookmarkTable } from "@bookshelf-client/web/components";

type BookmarkProps = {
  userData: User;
  folderData: Folder;
};

export default function Bookmark({ userData, folderData }: BookmarkProps) {
  useGetUser(userData.api_key, { initialData: userData });
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
