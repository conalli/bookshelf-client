import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { User } from "../../../../../libs/utils/src/lib/api/types";

export type MenuOption = "Commands" | "Bookmarks" | "Setup guide" | "Settings";

type MenuBarProps = {
  selected: MenuOption;
  setSelected: Dispatch<SetStateAction<MenuOption>>;
  user: User;
};

const generateStyles = (selected: MenuOption, option: MenuOption): string => {
  const selectedStyles =
    /*tw*/ "p-1 underline decoration-bk-blue dark:text-white  dark:decoration-bk-orange";
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
    <nav className="flex w-full bg-white p-2 shadow-lg dark:bg-bk-primary-dark sm:min-h-full sm:flex-col">
      <h1 className="hidden py-4 pl-8 underline decoration-bk-blue dark:decoration-bk-orange sm:flex sm:text-xl md:text-2xl lg:text-3xl">
        {generateDisplayName(user)}&apos;s Bookshelf
      </h1>
      <ul className="flex w-full justify-center gap-2 sm:flex-col sm:items-center sm:gap-14 sm:pt-[25vh] sm:text-lg lg:text-xl">
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
