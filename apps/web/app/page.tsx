import { Button } from "@bookshelf-client/ui/server";
import { About } from "@bookshelf-client/web/components";
import Link from "next/link";

export default function Home() {
  return (
    <div id="home" className="transition-opacity">
      <main className="min-w-sceen px-8">
        <section className="grid-cols-mobile grid-rows-mobile grid py-10 sm:grid-cols-6 sm:grid-rows-6 md:py-0">
          <div className="bk-rotate-text align-self-center col-span-2 col-start-3 row-span-3 row-start-1 flex flex-auto flex-col items-end justify-self-center text-white md:row-start-2">
            <h2 className="rotate-180 rounded bg-bk-orange px-1 py-4 text-3xl transition delay-100 ease-in-out hover:scale-y-110 md:text-4xl lg:text-6xl xl:text-7xl">
              Store.
            </h2>
            <h2 className="rotate-180 rounded bg-bk-red px-1 py-4 text-3xl transition delay-100 ease-in-out hover:scale-y-110 md:text-4xl lg:text-6xl xl:text-7xl">
              Use.
            </h2>
            <h2 className="rotate-180 rounded bg-bk-blue px-1 py-4 text-3xl transition delay-100 ease-in-out hover:scale-y-110 md:text-4xl lg:text-6xl xl:text-7xl">
              Update.
            </h2>
            <h2 className="group rotate-180 rounded bg-bk-orange px-1 py-4 text-3xl transition delay-100 ease-in-out hover:scale-y-110 md:text-4xl lg:text-6xl xl:text-7xl">
              Collaborate.&lowast;
            </h2>
            <h3 className="rotate-180 rounded bg-bk-red px-1 py-4 text-sm transition delay-100 ease-in-out hover:scale-y-110 lg:text-3xl xl:text-4xl">
              (&lowast;coming soon)
            </h3>
          </div>
          <div className="col-span-4 col-start-2 row-span-2 row-start-4 flex flex-1 items-center justify-center gap-2 place-self-center md:row-span-1 md:row-start-5 lg:gap-20">
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
            <Link href="#learn">
              <Button variant="outline">Learn more</Button>
            </Link>
          </div>
          <section className="col-span-6 col-start-1 row-start-6 flex place-self-center text-center sm:text-left md:col-span-4 md:col-start-2">
            <p className="underline decoration-bk-orange decoration-2 lg:text-xl">
              Manage and use your bookmarks more efficiently than ever before.
            </p>
          </section>
        </section>
      </main>
      <About />
    </div>
  );
}
