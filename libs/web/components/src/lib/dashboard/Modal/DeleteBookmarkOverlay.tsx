import type { Bookmark } from "@bookshelf-client/api";
import { useDeleteBookmark, useSelectBookmark } from "@bookshelf-client/hooks";
import { Loading } from "@bookshelf-client/ui";
import { Button } from "@bookshelf-client/ui/server";
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
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        {selected && (
          <Button
            disabled={isLoading}
            onClick={() => {
              mutate(selected.id);
            }}
            variant={"destructive"}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
