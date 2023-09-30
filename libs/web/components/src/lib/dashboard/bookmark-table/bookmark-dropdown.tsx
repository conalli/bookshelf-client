import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function BookmarkDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full hover:bg-neutral-700/90"
          aria-label="Edit bookmark"
        >
          <EllipsisVerticalIcon className="w-6 text-gray-400 " />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="rounded bg-white p-4 dark:bg-neutral-900"
          loop
          side="bottom"
        >
          <DropdownMenu.Arrow className="fill-[bg-neutral-900]" />
          <DropdownMenu.Item className="text-bk-orange hover:bg-bk-orange/20 rounded p-1">
            <button className="flex w-full items-center justify-between">
              Edit <PencilIcon width={16} height={16} />
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-white dark:bg-neutral-700" />
          <DropdownMenu.Item className="text-bk-red hover:bg-bk-red/20 rounded p-1">
            <button className="flex w-full items-center justify-between gap-2">
              Delete <TrashIcon width={16} height={16} />
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
