import { motion } from "framer-motion";
import React, { useState } from "react";
import SignInForm, { SignInFormVariant } from "../../src/components/SignInForm";

const SignIn = () => {
  const [formType, setFormType] = useState<SignInFormVariant>("Sign up");
  const changeFormType = () => {
    formType === "Log in" ? setFormType("Sign up") : setFormType("Log in");
  };
  const altType = formType === "Log in" ? "Sign up" : "Log in";
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
      <div className="grid grid-cols-6 grid-rows-4 bg-white dark:bg-neutral-800 shadow-md w-4/5 md:w-3/4 xl:w-2/4 h-4/5 rounded-md">
        <h1 className="col-start-2 col-span-4 md:col-start-2 md:col-span-4 text-xl md:text-3xl lg:text-6xl py-2 lg:py-10 self-start md:self-center justify-self-center">
          {formType}
        </h1>
        <div className="col-start-2 col-span-4 md:col-start-3 md:col-span-2 row-start-2 row-span-2 self-center justify-self-center">
          <SignInForm type={formType} />
        </div>
        <p className="col-start-1 col-span-6 py-4 md:col-start-2 md:col-span-4 self-end md:self-center justify-self-center row-start-4 text-xs md:text-xl lg:py-10">
          {formType === "Sign up" ? "Already" : "Don't"} have an account?{" "}
          <motion.button
            whileHover={{ scale: 1.1, x: 10 }}
            className="underline decoration-bk-blue dark:decoration-bk-orange decoration-2 px-1 rounded-sm"
            onClick={changeFormType}
          >
            {altType}
          </motion.button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignIn;
