import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import React from "react";
import { object, string } from "yup";
import { useAuth } from "../../hooks/useAuth";

export type SignInFormVariant = "Sign up" | "Log in";

type SignInFormProps = {
  type: SignInFormVariant;
};

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInForm: React.FC<SignInFormProps> = ({ type }) => {
  const { isAuthLoading, logIn } = useAuth();
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
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (
          values,
          { setSubmitting }: FormikHelpers<SignInFormValues>
        ) => {
          logIn({ type, values, setSubmitting });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-32 md:w-80">
            <div className="py-2 text-md md:text-xl w-full">
              <label htmlFor="email" className="pl-1 py-2">
                Email:
              </label>
              <Field
                id="email"
                name="email"
                placeholder="email"
                type="email"
                disabled={isSubmitting || isAuthLoading}
                autoCorrect="off"
                length={50}
                className="appearance-none bg-gray-100  text-gray-900 text-sm rounded-lg focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
              />
              <p className="text-bk-blue dark:text-bk-orange font-semibold pl-1 py-2 text-xs md:text-md">
                <ErrorMessage name="email" />
              </p>
            </div>
            <div className="py-2 text-md md:text-xl">
              <label htmlFor="password" className="py-2 pl-1">
                Password:
              </label>
              <Field
                id="password"
                name="password"
                placeholder="password"
                type="password"
                disabled={isSubmitting || isAuthLoading}
                autoCorrect="off"
                length={50}
                className="appearance-none bg-gray-100  text-gray-900 text-sm rounded-lg focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
              />
              <p className="text-bk-blue dark:text-bk-orange font-semibold pl-1 py-2 text-xs md:text-md">
                <ErrorMessage name="password" />
              </p>
              <div className="flex justify-center py-2 md:py-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  type="submit"
                  disabled={isSubmitting || isAuthLoading}
                  className="bg-bk-blue dark:bg-bk-orange text-sm md:text-xl px-5 py-2 w-24 md:w-40 hover:opacity-90 rounded shadow-md"
                >
                  {type}
                </motion.button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
