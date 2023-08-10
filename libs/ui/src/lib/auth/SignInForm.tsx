"use client";

import type { AuthRequestData } from "@bookshelf-client/hooks";
import { useAuth } from "@bookshelf-client/hooks";
import type { AuthRequest, SignInFormVariant } from "@bookshelf-client/utils";
import type { FormikHelpers } from "formik";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { object, string } from "yup";

type SignInFormProps = {
  type: SignInFormVariant;
};

const schema = object().shape({
  email: string()
    .min(3, "Email: minimum 3 characters")
    .max(50, "Email cannot be longer than 50 characters")
    .required("Please enter your email"),
  password: string()
    .min(5, "Password: min 5 characters")
    .max(20, "Password cannot be longer than 20 characters")
    .required("Please enter your password"),
});

export function SignInForm({ type }: SignInFormProps) {
  const {
    signIn: { isLoading: isSignInLoading, mutate: signin },
    signUp: { isLoading: isSignUpLoading, mutate: signup },
  } = useAuth();
  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (
        values,
        { setSubmitting }: FormikHelpers<AuthRequest>
      ) => {
        const authData: AuthRequestData = { data: values, setSubmitting };
        type === "Sign in" ? signin(authData) : signup(authData);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="">
          <div className="text-md w-full py-2 md:text-xl">
            <label htmlFor="email" className="py-2 pl-1">
              Email:
            </label>
            <Field
              id="email"
              name="email"
              placeholder="email"
              type="email"
              disabled={
                isSubmitting ||
                (type === "Sign in" ? isSignInLoading : isSignUpLoading)
              }
              autoCorrect="off"
              length={50}
              className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 md:text-xl"
            />
            <p className="md:text-md text-bk-blue dark:text-bk-orange py-2 pl-1 text-xs font-semibold">
              <ErrorMessage name="email" />
            </p>
          </div>
          <div className="text-md py-2 md:text-xl">
            <label htmlFor="password" className="py-2 pl-1">
              Password:
            </label>
            <Field
              id="password"
              name="password"
              placeholder="password"
              type="password"
              disabled={
                isSubmitting ||
                (type === "Sign in" ? isSignInLoading : isSignUpLoading)
              }
              autoCorrect="off"
              length={50}
              className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 md:text-xl"
            />
            <p className="md:text-md text-bk-blue dark:text-bk-orange py-2 pl-1 text-xs font-semibold">
              <ErrorMessage name="password" />
            </p>
            <div className="flex justify-center py-2 md:py-10">
              <motion.button
                data-cy={type}
                whileHover={{ scale: 1.1 }}
                type="submit"
                disabled={
                  isSubmitting ||
                  (type === "Sign in" ? isSignInLoading : isSignUpLoading)
                }
                className="bg-bk-blue dark:bg-bk-orange w-24 rounded px-5 py-2 text-sm shadow-md hover:opacity-90 md:w-40 md:text-xl"
              >
                {type}
              </motion.button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
