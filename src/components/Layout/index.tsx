import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { removeErrorMessage } from "../../utils/errorHelpers";
import ErrorNotification from "../ErrorNotification";
import LoadingPage from "../LoadingPage";
import Nav from "../Nav";

type LayoutProps = {
  children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthLoading, errorMessages, setErrorMessages } = useAuth();
  const { theme } = useTheme();
  const controls = useAnimation();

  const variants: Variants = {
    themeTransition: {
      opacity: [0, 1],
      transition: { duration: 1.5 },
    },
  };

  useEffect(() => {
    controls.start("themeTransition");
  }, [controls, theme]);

  const closeErrorMessage = (id: string) => {
    setErrorMessages(removeErrorMessage(errorMessages, id));
  };

  if (isAuthLoading) return <LoadingPage />;
  return (
    <AnimatePresence>
      <motion.div
        id="top"
        animate={controls}
        variants={variants}
        className="grid grid-cols-[1fr_90%_1fr] md:grid-cols-[1fr_80%_1fr] lg:grid-cols-[1fr_70%_1fr] grid-rows-[10vh_auto] bk-background min-h-screen max-w-screen"
      >
        <header className="w-full col-start-2 row-start-1 m-auto">
          <Nav />
        </header>
        <div className="col-start-2 row-start-2">{children}</div>
        <ul className="fixed bottom-0 right-0 top-0 flex flex-col justify-end">
          <AnimatePresence initial={false}>
            {errorMessages.map((err) => (
              <ErrorNotification
                key={err.id}
                error={err}
                closeErrorMessage={closeErrorMessage}
              />
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
