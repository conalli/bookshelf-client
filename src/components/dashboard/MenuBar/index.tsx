import React, { Dispatch, SetStateAction } from "react";

export type MenuOption = "Commands" | "Bookmarks" | "Setup guide" | "Settings";

type MenuBarProps = {
  selected: MenuOption;
  setSelected: Dispatch<SetStateAction<MenuOption>>;
};

const generateStyles = (selected: MenuOption, option: MenuOption): string => {
  const selectedStyles =
    /*tw*/ "p-1 rounded bg-bk-blue text-white  dark:bg-neutral-600";
  const unSelectedStyles = /*tw*/ "p-1 hover:cursor-pointer";

  return selected == option ? selectedStyles : unSelectedStyles;
};

const MenuBar: React.FC<MenuBarProps> = ({ selected, setSelected }) => {
  return (
    <nav className="h-full p-2 md:mr-4 bg-white dark:bg-neutral-800 rounded-l-md md:rounded-md shadow-lg">
      <ul className="flex flex-col gap-2">
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
