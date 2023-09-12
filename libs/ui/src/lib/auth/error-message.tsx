import { FieldError } from "react-hook-form";

type ErrorMessageProps = {
  error?: FieldError;
};

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="flex flex-col py-2">
      <p
        className={
          error ? "md:text-md text-xs text-red-500 lg:text-lg" : "invisible"
        }
      >
        {error ? error.message : "error placeholder"}
      </p>
    </div>
  );
}
