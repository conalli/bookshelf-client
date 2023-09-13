import { Nav } from "./nav";

export function Header() {
  return (
    <header className="sticky left-0 top-0 z-50 w-full bg-white shadow dark:bg-neutral-900 sm:bg-transparent">
      <Nav />
    </header>
  );
}
