import { APIURL } from "@bookshelf-client/api";
import type { SignInFormVariant } from "@bookshelf-client/utils";
import Link from "next/link";
import { GoogleIcon } from "../icons/google";

export const GoogleSignInButton: React.FC<{ authType: SignInFormVariant }> = ({
  authType,
}) => {
  const href = `${APIURL.AUTH}/oauth?provider=google&type=${
    authType === "Sign up" ? "signup" : "login"
  }`;
  return (
    <button className="flex justify-center rounded bg-gray-100 px-3 py-2 shadow-md hover:opacity-90 dark:bg-white dark:text-black sm:px-5">
      <Link
        className="sm:text-md flex items-center justify-center gap-2 text-sm"
        href={href}
      >
        <GoogleIcon />
        {`${authType} with Google`}
      </Link>
    </button>
  );
};
