import Nav from "./Nav";

function Header() {
  return (
    <header className="sticky left-0 top-0 z-10 w-full bg-white px-8 py-2 shadow-sm dark:bg-bk-primary-dark sm:bg-transparent sm:shadow-none sm:dark:bg-transparent">
      <Nav />
    </header>
  );
}

export default Header;
