import React, { useState } from "react";
import Nav from "../../src/components/Nav";
import SignInForm, { SignInFormVariant } from "../../src/components/SignInForm";

const SignIn = () => {
  const [formType, setFormType] = useState<SignInFormVariant>("Sign up");
  const changeFormType = () => {
    formType === "Log in" ? setFormType("Sign up") : setFormType("Log in");
  };
  const altType = formType === "Log in" ? "Sign up" : "Log in";
  return (
    <>
      <Nav />
      <SignInForm type={formType} />
      <p className="text-">
        {formType === "Log in" ? "Already" : "Don't"} have an account?{" "}
        <button
          className="bg-bk-red px-1 rounded-sm text-gray-50"
          onClick={changeFormType}
        >
          {altType}
        </button>
      </p>
    </>
  );
};

export default SignIn;
