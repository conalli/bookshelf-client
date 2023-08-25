import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const button = cva("", {
  variants: {
    variant: {
      primary:
        "bg-bk-blue outline-bk-blue dark:bg-bk-orange dark:outline-bk-orange w-28 rounded px-5 py-2 text-sm shadow-md outline hover:opacity-90 lg:w-40 lg:text-xl",
      secondary: "",
    },
    size: {
      sm: "",
      md: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = PropsWithChildren<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button({ children, variant, size }: ButtonProps) {
  return <button className={button({ variant, size })}>{children}</button>;
}

export function AnimatedButton({ children }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      className="bg-bk-blue outline-bk-blue dark:bg-bk-orange dark:outline-bk-orange w-28 rounded  px-5 py-2 text-sm shadow-md outline hover:opacity-90 lg:w-40 lg:text-xl"
    >
      {children}
    </motion.button>
  );
}
