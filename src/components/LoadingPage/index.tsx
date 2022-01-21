import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const LoadingPage = () => {
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
        className="h-screen w-screen flex items-center justify-center"
      >
        <svg
          width="192"
          height="192"
          viewBox="0 0 192 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="64" y="62" width="22" height="100" fill="#F2994A" />
          <rect x="86" y="73" width="21" height="89" fill="#EB5757" />
          <rect x="107" y="31" width="22" height="131" fill="#63B3ED" />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingPage;
