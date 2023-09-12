import { cva } from "class-variance-authority";
import Link from "next/link";
import { AriaAttributes, LiHTMLAttributes, ReactNode } from "react";

export type MenuBarOption = "Commands" | "Bookmarks" | "Setup" | "Settings";

type MenuBarItemProps = {
  icon: { solid: ReactNode; outline: ReactNode };
  option: MenuBarOption;
  selected: MenuBarOption;
} & LiHTMLAttributes<HTMLLIElement> &
  AriaAttributes;

const menubaritem = cva(
  "px-1 py-3 flex flex-col justify-center items-center text-sm rounded hover:bg-neutral-100 dark:hover:bg-neutral-800",
  {
    variants: {
      variant: {
        selected: "dark:text-white text-black",
        background: "hover:cursor-pointer text-black/50 dark:text-white/50",
      },
    },
  }
);

export function MenuBarItem(props: MenuBarItemProps) {
  const isSelected = props.option === props.selected;
  const variant = isSelected ? "selected" : "background";
  const url = new URLSearchParams({ tab: props.option.toLowerCase() });
  return (
    <Link className="min-w-full" href={`/dashboard?${url}`}>
      <li className={menubaritem({ variant })} {...props}>
        <div className="hidden h-6 w-6 sm:block">
          {isSelected ? props.icon.solid : props.icon.outline}
        </div>
        <p className="pt-2">{props.option}</p>
      </li>
    </Link>
  );
}
