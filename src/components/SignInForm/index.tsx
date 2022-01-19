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
  name: string;
  password: string;
};

const SignInForm: React.FC<SignInFormProps> = ({ type }) => {
  const { isAuthLoading, logIn } = useAuth();
  const schema = object().shape({
    name: string()
      .min(3, "Name: minimum 3 characters")
      .max(12, "Name cannot be longer than 12 characters")
      .required("Please enter your username"),
    password: string()
      .min(5, "Password: min 5 characters")
      .max(20, "Password cannot be longer than 20 characters")
      .required("Please enter your password"),
  });
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", password: "" }}
        onSubmit={async (
          values,
          { setSubmitting }: FormikHelpers<SignInFormValues>
        ) => {
          logIn({ type, values, setSubmitting });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col gap-2 py-2 text-xl">
              <label htmlFor="name" className="pl-1">
                Name:
              </label>
              <Field
                id="name"
                name="name"
                placeholder="name"
                type="text"
                disabled={isSubmitting || isAuthLoading}
                autoCorrect="off"
                length={50}
                className="appearance-none bg-gray-100  text-gray-900 text-sm rounded-lg focus:ring-bk-blue focus:border-bk-blue block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-bk-orange dark:focus:border-bk-orange shadow-md"
              />
              <p className="text-bk-blue dark:text-bk-orange font-semibold pl-1 text-md">
                <ErrorMessage name="name" />
              </p>
            </div>
            <div className="flex flex-col gap-2 py-2 text-xl">
              <label htmlFor="password">Password:</label>
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
              <p className="text-bk-blue dark:text-bk-orange font-semibold pl-1 text-md">
                <ErrorMessage name="password" />
              </p>
              <div className="flex justify-center py-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  type="submit"
                  disabled={isSubmitting || isAuthLoading}
                  className="bg-bk-blue dark:bg-bk-orange text-xl px-5 py-2 w-40 hover:opacity-90 rounded shadow-md"
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
