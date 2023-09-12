import { VariantProps, cva } from "class-variance-authority";
import { AriaAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";

const button = cva(
  "shadow-md hover:opacity-90 rounded transition delay-100 hover:scale-110",
  {
    variants: {
      variant: {
        primary: "bg-bk-blue dark:bg-bk-orange",
        secondary:
          "bg-bk-orange outline-bk-orange dark:bg-bk-blue dark:outline-bk-blue",
        outline: "underline decoration-2 decoration-bk-blue outline-bk-blue",
        add: "bg-green-400 disabled:bg-gray-300 disabled:text-opacity-50 disabled:opacity-50 dark:bg-gray-100 dark:text-neutral-600",
        destructive: "dark:gray-50 bg-bk-red",
      },
      size: {
        sm: "",
        md: "w-28 px-5 py-2 text-sm lg:w-40 lg:text-xl",
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
    <button className={button({ variant, size })} {...props}>
      {children}
    </button>
  );
}
