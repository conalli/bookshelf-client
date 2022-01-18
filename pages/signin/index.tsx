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
        <button className="bg-red-400 px-1 rounded-sm" onClick={changeFormType}>
          {altType}
        </button>
      </p>
    </>
  );
};

export default SignIn;
