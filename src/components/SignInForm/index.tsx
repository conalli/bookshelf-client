import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { object, string } from "yup";
import { useAuth } from "../../hooks/useAuth";

type SignInFormProps = {
  type: "Sign up" | "Log in";
};

type FormValues = {
  name: string;
  password: string;
};

const SignInForm: React.FC<SignInFormProps> = ({ type }) => {
  const { logIn } = useAuth();
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
          { setSubmitting }: FormikHelpers<FormValues>
        ) => {
          logIn({ type, values, setSubmitting });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name">Name:</label>
            <Field
              id="name"
              name="name"
              placeholder="name"
              type="text"
              disabled={isSubmitting}
            />
            <ErrorMessage name="name" />
            <label htmlFor="password">Password:</label>
            <Field
              id="password"
              name="password"
              placeholder="password"
              type="password"
              disabled={isSubmitting}
            />
            <ErrorMessage name="password" />
            <button type="submit">{type}</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
