"use client";

import { BookshelfLogo } from "@bookshelf-client/ui";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="my-6">
        <BookshelfLogo className={{ main: "h-20 w-40 lg:h-full lg:w-full" }} />
      </div>
      <h1 className="text-xl lg:text-4xl">
        Oops... It looks like something went wrong!
      </h1>
      <div className="flex flex-1 items-center justify-center gap-5 lg:gap-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-28 rounded bg-bk-blue px-5 py-2 text-sm  shadow-md outline outline-bk-blue hover:opacity-90 dark:bg-bk-orange dark:outline-bk-orange lg:w-40 lg:text-xl"
          onClick={() => router.push("/")}
        >
          Go back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-28 rounded px-5 py-2 text-sm underline decoration-bk-blue decoration-2 shadow-md outline outline-bk-blue hover:opacity-90 lg:w-40 lg:text-xl"
          onClick={() => router.push("/signin")}
        >
          Sign in
        </motion.button>
      </div>
    </div>
  );
}
