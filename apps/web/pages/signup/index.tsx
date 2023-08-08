import type { SignInFormVariant } from "@bookshelf-client/ui";
import { GoogleSignInButton, SignInForm } from "@bookshelf-client/ui";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

const SignUp = () => {
  const formType: SignInFormVariant = "Sign up";
  const altType: SignInFormVariant = "Sign in";
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
        },
      }}
      exit={{ opacity: 0, x: -20 }}
      className="flex h-4/5 w-full items-center justify-center py-4 md:h-full md:items-start md:py-10"
    >
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="grid h-4/5 w-4/5 grid-cols-6 grid-rows-4 rounded-md bg-white shadow-md dark:bg-neutral-800 md:w-3/4 xl:w-2/4">
        <h1 className="col-span-4 col-start-2 self-start justify-self-center py-2 text-xl md:col-span-4 md:col-start-2 md:self-center md:text-3xl lg:py-10 lg:text-6xl">
          {formType}
        </h1>
        <div className="col-span-4 col-start-2 row-span-2 row-start-2 self-center justify-self-center md:col-span-2 md:col-start-3">
          <SignInForm type={formType} />
          <div className="flex justify-center">
            <GoogleSignInButton authType={formType} />
          </div>
        </div>
        <p className="col-span-6 col-start-1 row-start-4 self-end justify-self-center py-4 text-xs md:col-span-4 md:col-start-2 md:self-center md:text-xl lg:py-10">
          {"Already have an account? "}
          <Link
            className="rounded-sm px-1 underline decoration-bk-blue decoration-2 dark:decoration-bk-orange"
            href="/signin"
          >
            {altType}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
