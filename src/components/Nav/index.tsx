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
      <button
        onClick={navigateHome}
        className="flex items-center p-2 mx-4 bg-white dark:bg-neutral-900 rounded-md shadow-lg"
      >
        <BookshelfLogo className={{ main: "h-12 w-28" }} />
      </button>

      <div className="flex flex-row gap-1 items-center mx-4 divide-x divide-bk-blue dark:divide-bk-orange  bg-white dark:bg-neutral-900 shadow-lg rounded-md">
        <Link href="/learn">
          <a className="py-2 px-4 ml-1 hover:dark:text-orange-300 rounded-md">
            Learn
          </a>
        </Link>
        <Link href="/dashboard">
          <a className=" py-2 px-4 hover:dark:text-orange-300">Dashboard</a>
        </Link>
        <div className="flex place-content-center px-4 mr-2">
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
