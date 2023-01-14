import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import GoogleSignInButton from "../../src/components/GoogleSignIn";
import LoadingPage from "../../src/components/Loading";
import SignInForm, { SignInFormVariant } from "../../src/components/SignInForm";
import { useAuthStatus } from "../../src/hooks/useAuth";

const SignIn = () => {
  const status = useAuthStatus();
  const formType: SignInFormVariant = "Sign in";
  const altType: SignInFormVariant = "Sign up";
  console.log("signin", status);
  if (status && (status.loading || status.success)) return <LoadingPage />;
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
      className="flex justify-center items-center md:items-start py-4 md:py-10 h-4/5 md:h-full"
    >
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="grid grid-cols-6 grid-rows-4 bg-white dark:bg-neutral-800 shadow-md w-4/5 md:w-3/4 xl:w-2/4 h-4/5 rounded-md">
        <h1 className="col-start-2 col-span-4 md:col-start-2 md:col-span-4 text-xl md:text-3xl lg:text-6xl py-2 lg:py-10 self-start md:self-center justify-self-center">
          {formType}
        </h1>
        <div className="col-start-2 col-span-4 md:col-start-3 md:col-span-2 row-start-2 row-span-2 self-center justify-self-center">
          <SignInForm type={formType} />
          <div className="flex justify-center">
            <GoogleSignInButton authType={formType} />
          </div>
        </div>
        <p className="col-start-1 col-span-6 py-4 md:col-start-2 md:col-span-4 self-end md:self-center justify-self-center row-start-4 text-xs md:text-xl lg:py-10">
          {"Don't have an account? "}
          <Link
            className="underline decoration-bk-blue dark:decoration-bk-orange decoration-2 px-1 rounded-sm"
            href="/signup"
          >
            {altType}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignIn;
