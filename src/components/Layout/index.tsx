import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useMessages } from "../../hooks/useMessages";
import ErrorNotification from "../ui/ErrorNotification";
import Header from "../ui/header";
import Loading from "../ui/Loading";

type LayoutProps = {
  children: ReactNode;
};

const MESSAGE_DURATION_MS = 3000;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { status } = useAuth();
  const { messages, removeMessage, removeMessageFIFO } = useMessages();
  const { theme } = useTheme();
  const controls = useAnimation();

  const variants: Variants = {
    themeTransition: {
      opacity: [0, 1],
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    controls.start("themeTransition");
  }, [controls, theme]);

  useEffect(() => {
    let time: NodeJS.Timer;
    if (messages.length) {
      time = setInterval(removeMessageFIFO, MESSAGE_DURATION_MS);
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
        className=" bk-background max-w-screen min-h-screen"
      >
        <Header />
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
