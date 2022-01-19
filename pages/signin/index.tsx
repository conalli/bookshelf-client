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
    <div className="flex flex-col justify-center items-center bg-white dark:bg-neutral-900">
      <h1 className="text-6xl py-10">{formType}</h1>
      <SignInForm type={formType} />
      <p className="text-xl py-10">
        {formType === "Log in" ? "Already" : "Don't"} have an account?{" "}
        <motion.button
          whileHover={{ scale: 1.1, x: 10 }}
          className="underline decoration-bk-blue dark:decoration-bk-orange decoration-2 px-1 rounded-sm"
          onClick={changeFormType}
        >
          {altType}
        </motion.button>
      </p>
    </div>
  );
};

export default SignIn;
