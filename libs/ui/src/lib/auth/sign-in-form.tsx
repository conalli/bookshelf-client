"use client";
import { useAuth } from "@bookshelf-client/hooks";
import type { SignInFormVariant } from "@bookshelf-client/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../button";
import { ErrorMessage } from "./error-message";

const schema = z.object({
  email: z
    .string()
    .email()
    .min(5, "Email: minimum 5 characters")
    .max(50, "Email cannot be longer than 50 characters"),
  password: z
    .string()
    .min(5, "Password: min 5 characters")
    .max(50, "Password cannot be longer than 50 characters"),
});

export type AuthFormData = z.infer<typeof schema>;

type SignInFormProps = {
  type: SignInFormVariant;
};

export function SignInForm({ type }: SignInFormProps) {
  const {
    signIn: { isLoading: isSignInLoading, mutate: signin },
    signUp: { isLoading: isSignUpLoading, mutate: signup },
  } = useAuth();
  const params = useSearchParams();
  const from = params.get("from");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
  });

  const submitForm = (data: AuthFormData) => {
    type === "Sign in" ? signin({ data, from }) : signup({ data, from });
  };

  const isDisabled =
    isLoading || (type === "Sign in" ? isSignInLoading : isSignUpLoading);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="text-md w-full py-2 md:text-xl">
        <label htmlFor="email" className="py-2 pl-1">
          Email:
        </label>
        <input
          id="email"
          placeholder="email"
          type="email"
          disabled={isDisabled}
          autoCorrect="off"
          {...register("email")}
          className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 md:text-xl"
        />
        <ErrorMessage error={errors.email} />
      </div>
      <div className="text-md py-2 md:text-xl">
        <label htmlFor="password" className="py-2 pl-1">
          Password:
        </label>
        <input
          id="password"
          placeholder="password"
          type="password"
          disabled={isDisabled}
          autoCorrect="off"
          {...register("password")}
          className="focus:border-bk-blue focus:ring-bk-blue dark:focus:border-bk-orange dark:focus:ring-bk-orange block appearance-none rounded-lg bg-gray-100 p-2.5 text-sm text-gray-900 shadow-md dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 md:text-xl"
        />
        <ErrorMessage error={errors.password} />
      </div>
      <div className="flex justify-center py-2 md:py-10">
        <Button data-cy={type} type="submit" disabled={isDisabled || !isValid}>
          {type}
        </Button>
      </div>
    </form>
  );
}
