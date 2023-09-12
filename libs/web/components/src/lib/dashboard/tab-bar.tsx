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
import { MenuBarItem, MenuBarOption } from "./menu-bar-item";

type MenuBarProps = {
  selected: MenuBarOption;
};

export function MenuBar({ selected }: MenuBarProps) {
  return (
    <nav className="flex w-full bg-white p-2 shadow dark:bg-neutral-900 sm:min-h-full sm:flex-col">
      <ul className="flex w-full justify-center gap-2 sm:flex-col sm:items-center sm:gap-6 sm:pt-2">
        <MenuBarItem
          selected={selected}
          option="Commands"
          icon={{
            solid: <BookmarkIconSolid />,
            outline: <BookmarkIconOutline />,
          }}
        />
        <MenuBarItem
          selected={selected}
          option="Bookmarks"
          icon={{
            solid: <BookOpenIconSolid />,
            outline: <BookOpenIconOutline />,
          }}
        />
        <MenuBarItem
          selected={selected}
          option="Setup"
          icon={{
            solid: <WrenchScredriverIconSolid />,
            outline: <WrenchScrewdriverIconOutline />,
          }}
        />
        {/* <li
          className={
            selected === "Settings"
              ? "underline  decoration-bk-blue decoration-2 dark:decoration-bk-orange"
              : "hover:cursor-pointer"
          }
          onClick={() => setSelected("Settings")}
        >
          Settings
        </li> */}
      </ul>
    </nav>
  );
}
