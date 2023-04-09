import type { User } from "@utils/api/types";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

export type MenuOption = "Commands" | "Bookmarks" | "Setup guide" | "Settings";

type MenuBarProps = {
  selected: MenuOption;
  setSelected: Dispatch<SetStateAction<MenuOption>>;
  user: User;
};

const generateStyles = (selected: MenuOption, option: MenuOption): string => {
  const selectedStyles =
    /*tw*/ "p-1 rounded bg-bk-blue text-white  dark:bg-neutral-600";
  const unSelectedStyles = /*tw*/ "p-1 hover:cursor-pointer";

  return selected == option ? selectedStyles : unSelectedStyles;
};

const generateDisplayName = (user: User): string => {
  if (user.given_name) return user.given_name;
  if (user.name) return user.name;
  if (user.family_name) return user.family_name;
  return user.email.split("@")[0];
};

const MenuBar: React.FC<MenuBarProps> = ({ selected, setSelected, user }) => {
  return (
    <nav className="flex min-h-full w-full flex-col bg-white p-2 shadow-lg dark:bg-bk-primary-dark">
      <h1 className="py-4 pl-8 text-xl underline decoration-bk-blue dark:decoration-bk-orange md:text-2xl lg:text-3xl">
        {generateDisplayName(user)}&apos;s Bookshelf
      </h1>
      <ul className="flex flex-col items-center justify-center gap-14 pt-[25vh] text-lg lg:text-xl">
        <li
          className={generateStyles(selected, "Commands")}
          onClick={() => setSelected("Commands")}
        >
          Commands
        </li>
        <li
          className={generateStyles(selected, "Bookmarks")}
          onClick={() => setSelected("Bookmarks")}
        >
          Bookmarks
        </li>
        <li
          className={generateStyles(selected, "Setup guide")}
          onClick={() => setSelected("Setup guide")}
        >
          Setup
        </li>
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
};

export default MenuBar;
