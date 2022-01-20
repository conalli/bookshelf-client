import { motion, useAnimation } from "framer-motion";
import { useTheme } from "next-themes";
import React, { ReactNode, useEffect } from "react";
import Nav from "../Nav";

type LayoutProps = {
  children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      transition: { duration: 1.5 },
    });
  }, [controls, theme]);

  return (
    <motion.div
      animate={controls}
      className="grid grid-cols-[1fr_90%_1fr] md:grid-cols-[1fr_70%_1fr] grid-rows-[10vh_auto] bk-background min-h-screen max-w-screen"
    >
      <header className="w-full col-start-2 row-start-1 m-auto">
        <Nav />
      </header>
      <div className="col-start-2 row-start-2">{children}</div>
    </motion.div>
  );
};

export default Layout;
