import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import React, { ReactNode, useEffect } from "react";
import { useMessages } from "../../hooks/useMessages";
import { useAuthStatus } from "../../hooks/useAuth";
import ErrorNotification from "../ErrorNotification";
import Loading from "../Loading";
import Nav from "../Nav";

type LayoutProps = {
  children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const status = useAuthStatus();
  const { messages, removeMessage, removeMessageFIFO } = useMessages();
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

  useEffect(() => {
    let time: NodeJS.Timer;
    if (messages.length) {
      time = setInterval(removeMessageFIFO, 5000);
    }
    return () => clearInterval(time);
  }, [messages, removeMessageFIFO]);

  if (status && status.loading) return <Loading isPage />;
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
            {messages
              .filter((err) => err.isError)
              .map((err) => (
                <ErrorNotification
                  key={err.id}
                  errorMessage={err}
                  closeErrorMessage={removeMessage}
                />
              ))}
          </AnimatePresence>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default Layout;
