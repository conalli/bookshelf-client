import { motion } from "framer-motion";
import Link from "next/link";

const About = () => {
  return (
    <article
      id="learn"
      className="w-full my-4 md:my-10 lg:my-20 p-4 flex flex-col bg-white dark:bg-neutral-800 rounded-md shadow-md"
    >
      <section className="flex flex-col py-1 sm:py-6">
        <h2 className="text-5xl font-bold py-4">About Bookshelf.</h2>
        <p className="text-xl">
          Bookshelf helps you to keep your bookmarks up to date across browsers,
          manage and assign commands for quick and easy access and gives you a
          tool to use them in your browser of choice. Bookshelf Search also
          comes with a webcli to manage your data through the Bookshelf custom
          search engine.
        </p>
      </section>
      <section>
        <h2 className="text-4xl font-bold py-4">How?</h2>
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
            &rarr; &nbsp; Use the Bookshelf custom search engine to access your
            commands on the fly.
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
