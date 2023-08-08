import { About } from "@bookshelf-client/web/components";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bookshelf</title>
      </Head>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
          },
        }}
        id="home"
      >
        <main className="min-w-sceen px-8">
          <section className="grid-cols-mobile grid-rows-mobile grid py-10 sm:grid-cols-6 sm:grid-rows-6 md:py-0">
            <div className="bk-rotate-text align-self-center col-span-2 col-start-3 row-span-3 row-start-1 flex flex-auto flex-col items-end justify-self-center text-white md:row-start-2">
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="  rounded bg-bk-orange px-1 py-4 text-3xl md:text-4xl lg:text-6xl xl:text-7xl"
              >
                Store.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="rounded bg-bk-red px-1 py-4 text-3xl md:text-4xl lg:text-6xl xl:text-7xl"
              >
                Use.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="rounded bg-bk-blue px-1 py-4 text-3xl md:text-4xl lg:text-6xl xl:text-7xl"
              >
                Update.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="group rounded bg-bk-orange px-1 py-4 text-3xl md:text-4xl lg:text-6xl xl:text-7xl"
              >
                Collaborate.&lowast;
              </motion.h2>
              <motion.h3
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="rounded bg-bk-red px-1 py-4 text-sm lg:text-3xl xl:text-4xl"
              >
                (&lowast;coming soon)
              </motion.h3>
            </div>
            <div className="col-span-4 col-start-2 row-span-2 row-start-4 flex flex-1 items-center justify-center gap-2 place-self-center md:row-span-1 md:row-start-5 lg:gap-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="w-28 rounded bg-bk-blue px-5 py-2 text-sm  shadow-md outline outline-bk-blue hover:opacity-90 dark:bg-bk-orange dark:outline-bk-orange lg:w-40 lg:text-xl"
              >
                <Link href="/signup">Sign up</Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="w-28 rounded px-5 py-2 text-sm underline decoration-bk-blue decoration-2 shadow-md outline outline-bk-blue hover:opacity-90 lg:w-40 lg:text-xl"
              >
                <a href="#learn">Learn more</a>
              </motion.button>
            </div>
            <section className="col-span-6 col-start-1 row-start-6 flex place-self-center text-center sm:text-left md:col-span-4 md:col-start-2">
              <p className="underline decoration-bk-orange decoration-2 lg:text-xl">
                Manage and use your bookmarks more efficiently than ever before.
              </p>
            </section>
          </section>
        </main>
        <About />
      </motion.div>
    </>
  );
}
