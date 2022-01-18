import Link from "next/link";
import React from "react";
import ThemeToggleButton from "../ThemeToggleButton";

const Nav = () => {
  return (
    <nav className="flex flex-row gap-2">
      <Link href="/learn">
        <a className="py-2 px-4">Learn</a>
      </Link>
      <Link href="/dashboard">
        <a className=" py-2 px-4">Dashboard</a>
      </Link>
      <ThemeToggleButton />
    </nav>
  );
};

export default Nav;
