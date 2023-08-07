import { Bars3Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import BookshelfLogo from "../../ui/BookshelfLogo";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

const navigateHome = (router: NextRouter) => router.push("/");

function Nav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useUser();

  const closeMobileNav = () => {
    setOpen(false);
  };

  return (
    <nav className="flex min-h-[8vh] flex-row justify-between py-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => navigateHome(router)}
        className="flex items-center rounded-md bg-white px-2 py-1 shadow-lg dark:bg-neutral-800"
      >
        <BookshelfLogo className={{ main: "h-10 w-20 lg:h-14 lg:w-28" }} />
      </motion.button>

      <div className="hidden rounded-md bg-white px-2 shadow-lg dark:bg-neutral-800 sm:flex sm:flex-row sm:items-center sm:gap-1">
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

export default Nav;
