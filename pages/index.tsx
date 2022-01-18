import { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "../src/components/Nav";

const Home: NextPage = () => {
  const router = useRouter();

  const handleSignInNav = () => {
    router.push("/signin");
  };

  return (
    <div className="">
      <div id="home" className="h-screen w-sceen">
        <header>
          <Nav />
        </header>
        <main>
          <section>
            <h2>Store.</h2>
            <h2>Update.</h2>
            <h2>Use.</h2>
            <h2>Collaborate. (coming soon)</h2>
          </section>
          <section>
            <h3>
              Bookshelf provides a platform to manage and use your bookmarks
              more efficiently and effectively than ever before.
            </h3>
          </section>
          <nav>
            <button onClick={handleSignInNav}>Sign In</button>
            <button>
              <a href="#learn">Learn more.</a>
            </button>
          </nav>
        </main>
      </div>

      <article id="learn" className="h-screen w-screen">
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
              Configure your browser to use Bookshelf as a custom search engine
            </li>
            <li>
              Use the Bookshelf search engine to access your bookmark commands
            </li>
            <li>
              You dont need to remember all your commands! Just type in your
              command and if it doesn&apos;t exist, Bookshelf will default to a
              Google search using your input.
            </li>
          </ul>
        </section>
        <a href="#home">Go to top</a>
      </article>
    </div>
  );
};

export default Home;
