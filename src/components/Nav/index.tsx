import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import BookshelfLogo from "../BookshelfLogo";
import ThemeToggleButton from "../ThemeToggleButton";

const Nav = () => {
  const router = useRouter();
  const navigateHome = () => router.push("/");
  return (
    <nav className="flex flex-row gap-2 justify-between py-2">
      <div className="flex items-center p-2 mx-4">
        <button onClick={navigateHome}>
          <BookshelfLogo className={{ main: "h-12 w-28" }} />
        </button>
      </div>
      <div className="flex flex-row gap-1 items-center mx-4 divide-x divide-bk-blue dark:bg-slate-800 rounded-sm">
        <Link href="/learn">
          <a className="py-2 px-4 ml-1 hover:dark:bg-slate-700 rounded-md">
            Learn
          </a>
        </Link>
        <Link href="/dashboard">
          <a className=" py-2 px-4 hover:dark:bg-gray-700">Dashboard</a>
        </Link>
        <div className="flex place-content-center px-4 mr-2">
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
