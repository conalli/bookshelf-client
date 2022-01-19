import { motion } from "framer-motion";
import { NextPage } from "next";
import { useRouter } from "next/router";

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
            <div className="col-start-3 col-span-2 row-start-2 row-span-3 bk-rotate-text justify-self-center align-self-center flex gap-5 flex-auto flex-col items-end ">
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.2 }}
                className="text-bk-orange font-black lg:text-6xl xl:text-7xl"
              >
                Store.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.2 }}
                className="text-transparent bg-clip-text bg-gradient-to-r to-bk-orange via-bk-red from-bk-red font-black lg:text-6xl xl:text-7xl rotate-180"
              >
                Use.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.2 }}
                className="text-bk-red font-black lg:text-6xl xl:text-7xl rotate-180"
              >
                Update.
              </motion.h2>
              <motion.h2
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.2 }}
                className="text-transparent bg-clip-text bg-gradient-to-r to-bk-red via-bk-blue from-bk-blue  font-black lg:text-6xl xl:text-7xl rotate-180 group"
              >
                Collaborate.
              </motion.h2>
              <motion.h3
                initial={{ rotate: 180 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="text-bk-blue font-black lg:text-4xl xl:text-5xl rotate-180"
              >
                (coming soon)
              </motion.h3>
            </div>
            <div className="col-start-3 col-span-2 row-start-5 flex justify-center items-center gap-20">
              <button
                className="bg-bk-blue dark:bg-bk-orange text-xl px-5 py-2 w-40 hover:opacity-90 rounded shadow-md"
                onClick={handleSignInNav}
              >
                Sign In
              </button>
              <button className="outline outline-bk-blue underline decoration-bk-blue decoration-2 text-xl px-5 py-2 w-40 hover:opacity-90 rounded shadow-md">
                <a href="#learn">Learn more</a>
              </button>
            </div>
            <section className="col-start-2 col-span-4 row-start-6 flex justify-center items-center">
              <p className="lg:text-xl">
                Bookshelf helps you to manage and use your bookmarks more
                efficiently than ever before.
              </p>
            </section>
          </section>
        </main>
        <article id="learn" className="w-screen">
          <section>
            <h2>About</h2>
            <p>
              Use Bookshelf to keep your bookmarks up to date and then use your
              chosen commands to access them quickly in your browser of choice.
            </p>
          </section>
          <section>
            <h2>How?</h2>
            <ul>
              <li>Sign up to Bookshelf</li>
              <li>Add bookmarks with your chosen commands to your account</li>
              <li>
                Configure your browser to use Bookshelf as a custom search
                engine
              </li>
              <li>
                Use the Bookshelf search engine to access your bookmark commands
              </li>
              <li>
                You dont need to remember all your commands! Just type in your
                command and if it doesn&apos;t exist, Bookshelf will default to
                a Google search using your input.
              </li>
            </ul>
          </section>
          <a href="#home">Go to top</a>
        </article>
      </div>
    </>
  );
};

export default Home;
