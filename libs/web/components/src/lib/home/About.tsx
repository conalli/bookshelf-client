import { motion } from "framer-motion";
import Link from "next/link";

export const About = () => {
  return (
    <article
      id="learn"
      className="flex w-full flex-col rounded-md bg-white px-8 py-4 shadow-md dark:bg-neutral-800 md:py-8"
    >
      <section className="flex flex-col py-1 sm:py-6">
        <h2 className="py-4 text-3xl font-bold sm:text-5xl">
          About Bookshelf.
        </h2>
        <p className="sm:text-xl">
          Bookshelf helps you to keep your bookmarks up to date across browsers,
          manage and assign commands for quick and easy access and gives you a
          tool to use them in your browser of choice. Bookshelf Search also
          comes with a webcli to manage your data through the Bookshelf custom
          search engine.
        </p>
      </section>
      <section>
        <h2 className="py-4 text-2xl font-bold sm:text-4xl">How?</h2>
        <ul className="sm:pt-4 sm:text-xl">
          <li className="py-1 md:py-2">
            &rarr; &nbsp;
            <Link
              className="decoration-bk-blue hover:text-bk-blue dark:decoration-bk-orange dark:hover:text-bk-orange underline decoration-2"
              href="/signin"
            >
              Sign up
            </Link>{" "}
            for a Bookshelf account.
          </li>
          <li className="py-1 md:py-2">
            &rarr; &nbsp; Add your bookmarks along with your chosen commands to
            your account.
          </li>
          <li className="py-1 md:py-2">
            &rarr; &nbsp; Configure your browser to use Bookshelf as a custom
            search engine.
          </li>
          <li className="py-1 md:py-2">
            &rarr; &nbsp; Use the Bookshelf custom search engine to access your
            commands on the fly.
          </li>
        </ul>
      </section>
      <motion.a
        href="#top"
        className="decoration-bk-blue hover:text-bk-blue py-6 text-xl underline decoration-2"
      >
        To top
      </motion.a>
    </article>
  );
};
