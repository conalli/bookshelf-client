"use client";

import { AnimatePresence, motion } from "framer-motion";

export function Loading({ isPage = false }: { isPage?: boolean }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{ opacity: 0 }}
        className={`${
          isPage
            ? "absolute left-0 top-0 z-10 min-h-screen min-w-full"
            : "h-full w-full"
        } flex items-center justify-center`}
      >
        <motion.svg
          width="192"
          height="192"
          viewBox="0 0 192 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            initial={{ y: 0 }}
            animate={{
              y: [-20, 0],
              transition: {
                type: "spring",
                duration: 0.5,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0.1,
              },
            }}
            x="64"
            y="62"
            width="22"
            height="100"
            fill="#F2994A"
          />
          <motion.rect
            initial={{ y: 0 }}
            animate={{
              y: [-20, 0],
              transition: {
                type: "spring",
                delay: 0.2,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0.1,
              },
            }}
            x="86"
            y="73"
            width="21"
            height="89"
            fill="#EB5757"
          />
          <motion.rect
            initial={{ y: 0 }}
            animate={{
              y: [-20, 0],
              transition: {
                type: "spring",
                delay: 0.4,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0.1,
              },
            }}
            x="107"
            y="31"
            width="22"
            height="131"
            fill="#63B3ED"
          />
        </motion.svg>
      </motion.div>
    </AnimatePresence>
  );
}
