import { useDeleteBookmark, useSelectBookmark } from "@bookshelf-client/hooks";
import { Loading } from "@bookshelf-client/ui";
import type { Bookmark } from "@bookshelf-client/utils";
import type { SetStateAction } from "jotai";

type DeleteBookmarkOverlayProps = {
  apiKey: string;
  selected: Bookmark | null;
  setIsOpen: (update: SetStateAction<boolean>) => void;
};

export function DeleteBookmarkOverlay({
  apiKey,
  selected,
  setIsOpen,
}: DeleteBookmarkOverlayProps) {
  const { mutate, isSuccess, isLoading, isError } = useDeleteBookmark(apiKey);
  const { setSelectedBookmark } = useSelectBookmark();
  if (isSuccess || isError) {
    setSelectedBookmark(null);
    setIsOpen(false);
  }
  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col p-3 lg:p-6">
      <h1 className="py-1 text-3xl md:py-2 lg:py-3">Delete Bookmark: </h1>
      <p className="text-md py-1 md:py-2 md:text-xl lg:py-3">
        Are you sure you want to delete bookmark:
      </p>
      {selected && (
        <p className="text-md pb-5 font-bold md:text-xl">
          {selected.name} - {selected.url}
        </p>
      )}
      <div className="flex w-full items-center justify-between py-2 lg:py-4">
        <button
          onClick={() => setIsOpen(false)}
          className="bg-bk-blue dark:bg-bk-orange w-24 rounded px-5 py-2 text-sm shadow-md hover:opacity-90 md:w-40 md:text-xl"
        >
          Cancel
        </button>
        {selected && (
          <button
            disabled={isLoading}
            onClick={() => {
              mutate(selected.id);
            }}
            className="dark:gray-50 bg-bk-red w-24 rounded px-5 py-2 text-sm shadow-md hover:opacity-90 md:w-40 md:text-xl"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
