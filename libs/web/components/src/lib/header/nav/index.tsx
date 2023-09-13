"use client";

import { useUser } from "@bookshelf-client/hooks";
import { BookshelfLogo } from "@bookshelf-client/ui";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export function Nav() {
  const [open, setOpen] = useState(false);
  const user = useUser();

  const closeMobileNav = () => {
    setOpen(false);
  };

  return (
    <nav className="flex min-h-[8vh] flex-row justify-between px-8 py-2">
      <Link href="/">
        <button className="flex items-center rounded-md px-2 py-1 shadow-lg transition-transform hover:scale-110">
          <BookshelfLogo className={{ main: "h-10 w-20 lg:h-14 lg:w-28" }} />
        </button>
      </Link>
      <div className="hidden px-2 sm:flex sm:flex-row sm:items-center sm:gap-1">
        <NavLinks user={user} />
      </div>
      <div className="flex items-center sm:hidden">
        <button onClick={() => setOpen(true)}>
          <Bars3Icon className="focus:shadow-outline h-6 w-6 items-center dark:text-white md:h-8 md:w-8 lg:h-10 lg:w-10" />
        </button>
        <MobileMenu open={open} user={user} handleClose={closeMobileNav} />
      </div>
    </nav>
  );
}
