import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../../hooks/useUser";
import BookshelfLogo from "../BookshelfLogo";
import ThemeToggleButton from "../ThemeToggleButton";

const Nav = () => {
  const router = useRouter();
  const user = useUser();
  const navigateHome = () => router.push("/");
  return (
    <nav className="flex flex-row md:gap-2 justify-between py-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={navigateHome}
        className="flex items-center p-1 md:p-2 md:mr-4 bg-white dark:bg-neutral-800 rounded-l-md md:rounded-md shadow-lg"
      >
        <BookshelfLogo className={{ main: "h-6 w-14 lg:h-12 lg:w-28" }} />
      </motion.button>

      <div className="flex flex-row gap-1 items-center lg:ml-4 divide-x divide-bk-blue dark:divide-bk-orange  bg-white dark:bg-neutral-800 shadow-lg rounded-r-md md:rounded-md">
        <Link
          className="text-xs md:text-sm p-1 md:p-2 md:px-4 md:ml-1 hover:text-bk-blue hover:dark:text-orange-300"
          href="/#learn"
        >
          About
        </Link>
        {user ? (
          <Link
            className="text-xs md:text-sm p-1 md:p-2 md:px-4 hover:text-bk-blue hover:dark:text-orange-300"
            href="/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className="text-xs md:text-sm p-1 md:p-2 md:px-4 hover:text-bk-blue hover:dark:text-orange-300"
            href="/signin"
          >
            Sign In
          </Link>
        )}
        <div className="flex place-content-center px-2 md:px-4 md:mr-2">
          <ThemeToggleButton
            buttonClass="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 focus:shadow-outline"
            iconClass={{
              dark: "p-1 md:p-2 text-orange-200 hover:text-orange-300 rounded-full",
              light:
                "p-1 md:p-2 text-gray-500 hover:text-gray-800 rounded-full",
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
