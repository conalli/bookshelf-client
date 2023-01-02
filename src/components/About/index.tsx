import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <article
      id="learn"
      className="w-full my-4 md:my-10 lg:my-20 p-4 flex flex-col bg-white dark:bg-neutral-800 rounded-md shadow-md"
    >
      <section className="flex flex-col py-1 sm:py-6">
        <h2 className="text-6xl font-bold py-4">About.</h2>
        <p className="text-xl">
          Use Bookshelf to keep your bookmarks up to date and then use the
          commands that you assigned to them to quickly access them in your
          browser of choice.
        </p>
      </section>
      <section>
        <h2 className="text-4xl font-bold py-4 text-bk-blue dark:text-bk-orange">
          How?
        </h2>
        <ul className="pt-4 text-xl">
          <li className="py-1 md:py-2">
            &rarr; &nbsp;
            <Link
              className="underline decoration-bk-blue dark:decoration-bk-orange decoration-2 hover:text-bk-blue dark:hover:text-bk-orange"
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
            &rarr; &nbsp; Use the Bookshelf search engine to access your
            bookmarks on the fly.
          </li>
        </ul>
      </section>
      <motion.a
        href="#top"
        className="underline py-6 decoration-bk-blue decoration-2 text-xl hover:text-bk-blue"
      >
        To top
      </motion.a>
    </article>
  );
};

export default About;
