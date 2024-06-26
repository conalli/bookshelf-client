import { VariantProps, cva } from "class-variance-authority";
import { AriaAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const button = cva(
  "shadow-md hover:opacity-90 disabled:hover:opacity-100 rounded transition delay-100 hover:scale-110 disabled:hover:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-bk-blue dark:bg-bk-orange disabled:bg-bk-blue/90 dark:disabled:bg-bk-orange/90",
        secondary:
          "bg-bk-orange dark:bg-bk-blue disabled:bg-bk-orange/90 disabled:dark:bg-bk-blue/90",
        outline:
          "underline outline decoration-2 decoration-bk-blue outline-bk-blue",
        add: "bg-green-400 disabled:bg-gray-300 disabled:text-opacity-50 disabled:opacity-50 dark:bg-gray-100 dark:text-neutral-600",
        destructive: "dark:gray-50 bg-bk-red",
      },
      size: {
        sm: "",
        md: "sm:w-28 px-5 py-2 text-sm lg:w-40 sm:text-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> &
    AriaAttributes &
    VariantProps<typeof button>
>;

export function Button(props: ButtonProps) {
  const { variant, size, children } = props;
  return (
    <button
      className={twMerge(button({ variant, size }), props.className)}
      {...props}
    >
      {children}
    </button>
  );
}
