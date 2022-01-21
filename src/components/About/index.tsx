import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <article
      id="learn"
      className="w-full my-10 lg:my-20 p-4 flex flex-col bg-white dark:bg-neutral-900 rounded-md shadow-md"
    >
      <section className="flex flex-col py-6">
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
            <Link href="/signin" passHref>
              <a className="underline decoration-bk-blue dark:decoration-bk-orange decoration-2 hover:text-bk-blue dark:hover:text-bk-orange">
                Sign up
              </a>
            </Link>{" "}
            for a Bookshelf account.
          </li>
          <li className="py-1 md:py-2">
            &rarr; &nbsp; Add your bookmarks along with your chosen commands to
            your account.
          </li>
          <li className="py-1 md:py-2">
            &rarr; &nbsp; Configure your browser to use Bookshelf as a custom
            search engine. [Learn More]
          </li>
          <li className="py-1 md:py-2">
            &rarr; &nbsp; Use the Bookshelf search engine to access your
            bookmarks on the fly.
          </li>
        </ul>
      </section>
      <motion.a
        whileHover={{ scale: 1.1, x: 50 }}
        href="#top"
        className="underline py-6 decoration-bk-blue decoration-2 text-xl"
      >
        To top
      </motion.a>
    </article>
  );
};

export default About;
