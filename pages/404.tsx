import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import BookshelfLogo from "../src/components/BookshelfLogo";

const Four04 = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="my-6">
        <BookshelfLogo className={{ main: "w-40 h-20 lg:w-full lg:h-full" }} />
      </div>
      <h1 className="text-xl lg:text-4xl">
        Oops... It looks like something went wrong!
      </h1>
      <div className="flex flex-1 justify-center items-center gap-5 lg:gap-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="outline outline-bk-blue dark:outline-bk-orange bg-bk-blue dark:bg-bk-orange text-sm  lg:text-xl px-5 py-2 w-28 lg:w-40 hover:opacity-90 rounded shadow-md"
          onClick={() => router.push("/")}
        >
          Go back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="outline outline-bk-blue underline decoration-bk-blue decoration-2 text-sm lg:text-xl px-5 py-2 w-28 lg:w-40 hover:opacity-90 rounded shadow-md"
          onClick={() => router.push("/signin")}
        >
          Sign in
        </motion.button>
      </div>
    </div>
  );
};

export default Four04;
