"use client";

import { useAuth, useMessages } from "@bookshelf-client/hooks";
import { ErrorNotification, Loading } from "@bookshelf-client/ui";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Header } from "../header";

type LayoutProps = {
  children: ReactNode;
};

const MESSAGE_DURATION_MS = 3000;

export function Layout({ children }: LayoutProps) {
  const {
    status,
    signOut: { isLoading: isSignOutLoading },
  } = useAuth();
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
    let time: NodeJS.Timeout;
    if (messages.length) {
      time = setInterval(removeMessageFIFO, MESSAGE_DURATION_MS);
    }
    return () => clearInterval(time);
  }, [messages, removeMessageFIFO]);

  if ((status && status.loading) || isSignOutLoading) return <Loading isPage />;
  return (
    <AnimatePresence>
      <motion.div
        id="top"
        animate={controls}
        variants={variants}
        className="bk-background dark:bg-bk-bg-dark flex flex-col"
      >
        <Header />
        <main className="flex min-h-[92vh] grow">{children}</main>
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
}
