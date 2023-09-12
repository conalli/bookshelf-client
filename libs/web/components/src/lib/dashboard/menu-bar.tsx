import type { User } from "@bookshelf-client/api";
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
import type { Dispatch, SetStateAction } from "react";
import { MenuBarItem, MenuBarOption } from "./menu-bar-item";

type MenuBarProps = {
  selected: MenuBarOption;
  setSelected: Dispatch<SetStateAction<MenuBarOption>>;
  user: User;
};

const generateDisplayName = (user: User): string => {
  if (user.given_name) return user.given_name;
  if (user.name) return user.name;
  if (user.family_name) return user.family_name;
  return user.email.split("@")[0];
};

export function MenuBar({ selected, setSelected, user }: MenuBarProps) {
  return (
    <nav className="flex w-full bg-white p-2 shadow-lg dark:bg-neutral-900 sm:min-h-full sm:flex-col">
      {/* <h1 className="decoration-bk-blue dark:decoration-bk-orange hidden py-4 pl-8 underline sm:flex sm:text-xl md:text-2xl lg:text-3xl">
        {generateDisplayName(user)}&apos;s Bookshelf
      </h1> */}
      <ul className="flex w-full justify-center gap-2 sm:flex-col sm:items-center sm:gap-6 sm:pt-2">
        <MenuBarItem
          selected={selected}
          option="Commands"
          icon={{
            solid: <BookmarkIconSolid />,
            outline: <BookmarkIconOutline />,
          }}
          onClick={() => setSelected("Commands")}
        />
        <MenuBarItem
          selected={selected}
          option="Bookmarks"
          icon={{
            solid: <BookOpenIconSolid />,
            outline: <BookOpenIconOutline />,
          }}
          onClick={() => setSelected("Bookmarks")}
        />
        <MenuBarItem
          selected={selected}
          option="Setup"
          icon={{
            solid: <WrenchScredriverIconSolid />,
            outline: <WrenchScrewdriverIconOutline />,
          }}
          onClick={() => setSelected("Setup")}
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
