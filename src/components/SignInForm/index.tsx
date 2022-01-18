import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
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
      .min(3, "Please enter a name with 3 or more characters")
      .required("Please enter your username"),
    password: string()
      .min(5, "Please enter a password with 5 or more characters")
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
          <Form className="flex flex-col items-start">
            <label htmlFor="name">Name:</label>
            <span className="text-orange-400 font-bold">
              <ErrorMessage name="name" />
            </span>
            <Field
              id="name"
              name="name"
              placeholder="name"
              type="text"
              disabled={isSubmitting || isAuthLoading}
            />
            <label htmlFor="password">Password:</label>
            <span className="text-orange-400 font-bold">
              <ErrorMessage name="password" />
            </span>
            <Field
              id="password"
              name="password"
              placeholder="password"
              type="password"
              disabled={isSubmitting || isAuthLoading}
            />
            <button
              type="submit"
              disabled={isSubmitting || isAuthLoading}
              className="bg-blue-300 px-3 py-1 rounded-sm"
            >
              {type}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
