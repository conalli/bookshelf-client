import React, { ReactNode } from "react";
import Nav from "../Nav";

type LayoutProps = {
  children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr_70%_1fr] grid-rows-[10vh_auto] bk-background min-h-screen max-w-screen">
      <header className="w-full col-start-2 row-start-1 m-auto">
        <Nav />
      </header>
      <div className="col-start-2 row-start-2">{children}</div>
    </div>
  );
};

export default Layout;
