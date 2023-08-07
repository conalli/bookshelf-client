import Link from "next/link";
import { useAuth } from "../../../hooks";
import type { User } from "../../../utils/api/types";
import ThemeToggleButton from "../ThemeToggleButton";

const linkStyles =
  /*tw*/ "py-1 px-2 hover:text-bk-blue hover:dark:text-orange-300";

function NavLinks({ user }: { user: User | null }) {
  const {
    signOut: { mutate: signOut },
  } = useAuth();
  return (
    <>
      <Link className={linkStyles} href="/#learn">
        About
      </Link>
      {user ? (
        <Link className={linkStyles} href="/dashboard">
          Dashboard
        </Link>
      ) : (
        <Link className={linkStyles} href="/signin">
          Sign In
        </Link>
      )}
      {user && (
        <button
          onClick={() => signOut()}
          className={linkStyles + " flex justify-start"}
        >
          Log out
        </button>
      )}
      <div className="flex px-2 sm:place-content-center md:px-4">
        <ThemeToggleButton
          buttonClass="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 focus:shadow-outline"
          iconClass={{
            dark: "p-1 md:p-2 text-orange-200 hover:text-orange-300 rounded-full",
            light: "p-1 md:p-2 text-gray-500 hover:text-gray-800 rounded-full",
          }}
        />
      </div>
    </>
  );
}

export default NavLinks;
