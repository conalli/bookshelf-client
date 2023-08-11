import type { Metadata } from "next";
import SignIn from ".";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Create an account or log into Bookshelf. Add your bookmarks and then manage or access them anywhere.",
};

export default function SignInPage() {
  return <SignIn />;
}
