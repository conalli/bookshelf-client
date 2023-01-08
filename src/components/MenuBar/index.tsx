import React, { Dispatch, SetStateAction } from "react";

export type MenuOption = "Commands" | "Bookmarks" | "Setup guide" | "Settings";

type MenuBarProps = {
  selected: MenuOption;
  setSelected: Dispatch<SetStateAction<MenuOption>>;
};

const MenuBar: React.FC<MenuBarProps> = ({ selected, setSelected }) => {
  return (
    <nav className="h-full p-1 md:p-2 md:mr-4 bg-white dark:bg-neutral-800 rounded-l-md md:rounded-md shadow-lg">
      <ul className="flex flex-col gap-2">
        <li
          className={
            selected === "Commands"
              ? "underline decoration-2 decoration-bk-blue dark:decoration-bk-orange"
              : "hover:cursor-pointer"
          }
          onClick={() => setSelected("Commands")}
        >
          Commands
        </li>
        <li
          className={
            selected === "Bookmarks"
              ? "underline  decoration-2 decoration-bk-blue dark:decoration-bk-orange"
              : "hover:cursor-pointer"
          }
          onClick={() => setSelected("Bookmarks")}
        >
          Bookmarks
        </li>
        <li
          className={
            selected === "Setup guide"
              ? "underline  decoration-2 decoration-bk-blue dark:decoration-bk-orange"
              : "hover:cursor-pointer"
          }
          onClick={() => setSelected("Setup guide")}
        >
          Setup guide
        </li>
        {/* <li
          className={
            selected === "Settings"
              ? "underline  decoration-2 decoration-bk-blue dark:decoration-bk-orange"
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
