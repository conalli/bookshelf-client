import { motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import About from "../src/components/About";

const Home: NextPage = () => {
  const router = useRouter();

  const handleSignInNav = () => {
    router.push("/signin");
  };

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
        exit={{ opacity: 0, x: -20 }}
        id="home"
        className=""
      >
        <main className="h-4/5 min-w-sceen m-0">
          <section className="grid grid-cols-6 grid-rows-6 py-6 md:py-0">
            <div className="col-start-3 col-span-2 row-start-1 md:row-start-2 row-span-3 bk-rotate-text justify-self-center align-self-center flex flex-auto flex-col items-end text-white">
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="  bg-bk-orange py-4 px-1 text-2xl md:text-4xl lg:text-6xl xl:text-7xl rounded"
              >
                Store.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="py-4 px-1 text-2xl md:text-4xl bg-bk-red lg:text-6xl xl:text-7xl rounded"
              >
                Use.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="py-4 px-1 text-2xl md:text-4xl bg-bk-blue lg:text-6xl xl:text-7xl rounded"
              >
                Update.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="py-4 px-1 text-2xl md:text-4xl bg-bk-orange lg:text-6xl xl:text-7xl rounded group"
              >
                Collaborate.&lowast;
              </motion.h2>
              <motion.h3
                initial={{ rotate: 180 }}
                whileHover={{ scaleY: 1.1 }}
                className="py-4 px-1 text-sm bg-bk-red lg:text-3xl xl:text-4xl rounded"
              >
                (&lowast;coming soon)
              </motion.h3>
            </div>
            <div className="col-start-2 col-span-4 row-start-4 md:row-start-5 row-span-2 md:row-span-1 place-self-center flex flex-1 justify-center items-center gap-2 lg:gap-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="outline outline-bk-blue dark:outline-bk-orange bg-bk-blue dark:bg-bk-orange text-sm  lg:text-xl px-5 py-2 w-28 lg:w-40 hover:opacity-90 rounded shadow-md"
                onClick={handleSignInNav}
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="outline outline-bk-blue underline decoration-bk-blue decoration-2 text-sm lg:text-xl px-5 py-2 w-28 lg:w-40 hover:opacity-90 rounded shadow-md"
              >
                <a href="#learn">Learn more</a>
              </motion.button>
            </div>
            <section className="col-start-1 md:col-start-2 col-span-6 md:col-span-4 row-start-6 flex place-self-center text-center sm:text-left">
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
};

export default Home;
