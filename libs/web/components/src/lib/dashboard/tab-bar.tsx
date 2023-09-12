import {
  BookOpenIcon as BookOpenIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  WrenchScrewdriverIcon as WrenchScrewdriverIconOutline,
} from "@heroicons/react/24/outline";
import {
  BookOpenIcon as BookOpenIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  WrenchScrewdriverIcon as WrenchScredriverIconSolid,
} from "@heroicons/react/24/solid";
import { TabBarItem, type DashboardTab } from "./tab-bar-item";

type MenuBarProps = {
  selected: DashboardTab;
};

export function TabBar({ selected }: MenuBarProps) {
  return (
    <nav className="bg-white p-2 shadow dark:bg-neutral-900 sm:min-h-full sm:flex-col">
      <ul className="flex w-full justify-center gap-2 sm:flex-col sm:items-center sm:gap-6 sm:pt-2">
        <TabBarItem
          selected={selected}
          option="Commands"
          icon={{
            solid: <BookmarkIconSolid />,
            outline: <BookmarkIconOutline />,
          }}
        />
        <TabBarItem
          selected={selected}
          option="Bookmarks"
          icon={{
            solid: <BookOpenIconSolid />,
            outline: <BookOpenIconOutline />,
          }}
        />
        <TabBarItem
          selected={selected}
          option="Setup"
          icon={{
            solid: <WrenchScredriverIconSolid />,
            outline: <WrenchScrewdriverIconOutline />,
          }}
        />
      </ul>
    </nav>
  );
}
