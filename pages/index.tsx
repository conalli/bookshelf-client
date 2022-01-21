import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import About from "../src/components/About";

const Home: NextPage = () => {
  const router = useRouter();

  const handleSignInNav = () => {
    router.push("/signin");
  };

  return (
    <>
      <div id="home" className="">
        <main className="h-4/5 min-w-sceen m-0">
          <section className="grid grid-cols-6 grid-rows-6">
            <div className="col-start-3 col-span-2 row-start-2 row-span-3 bk-rotate-text justify-self-center align-self-center flex gap-5 flex-auto flex-col items-end text-white">
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.2 }}
                className="  bg-bk-orange py-4 px-1 font-black lg:text-6xl xl:text-7xl rounded"
              >
                Store.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                className="py-4 px-1 bg-gradient-to-r to-bk-orange via-bk-red from-bk-red font-black lg:text-6xl xl:text-7xl rounded"
              >
                Use.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                className="py-4 px-1 bg-bk-red font-black lg:text-6xl xl:text-7xl rounded"
              >
                Update.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                className="py-4 px-1 bg-gradient-to-r to-bk-red via-bk-blue from-bk-blue  font-black lg:text-6xl xl:text-7xl rounded group"
              >
                Collaborate.
              </motion.h2>
              <motion.h3
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.1 }}
                className="py-4 px-1 bg-bk-blue font-black lg:text-3xl xl:text-4xl rounded"
              >
                (coming soon)
              </motion.h3>
            </div>
            <div className="col-start-2 col-span-4 row-start-5 place-self-center flex flex-1 justify-center items-center gap-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-bk-blue dark:bg-bk-orange text-xl px-5 py-2 w-40 hover:opacity-90 rounded shadow-md"
                onClick={handleSignInNav}
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="outline outline-bk-blue underline decoration-bk-blue decoration-2 text-xl px-5 py-2 w-40 hover:opacity-90 rounded shadow-md"
              >
                <a href="#learn">Learn more</a>
              </motion.button>
            </div>
            <section className="col-start-2 col-span-4 row-start-6 flex place-self-center">
              <p className="underline decoration-bk-orange decoration-2 lg:text-xl">
                Manage and use your bookmarks more efficiently than ever before.
              </p>
            </section>
          </section>
        </main>
        <About />
      </div>
    </>
  );
};

export default Home;
