import { motion } from "framer-motion";
import React from "react";

const CommandPlaceholder = () => {
  return (
    <motion.div className="relative text-3xl w-full h-full flex items-center justify-center">
      Stacking shelves
      <motion.p
        className="inline-block"
        animate={{
          y: [-10, 0],
          transition: {
            type: "spring",
            delay: 0.7,
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0,
          },
        }}
      >
        .
      </motion.p>
      <motion.p
        className="inline-block"
        animate={{
          y: [-10, 0],
          transition: {
            type: "spring",
            delay: 0.5,
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0,
          },
        }}
      >
        .
      </motion.p>
      <motion.p
        className="inline-block"
        animate={{
          y: [-10, 0],
          transition: {
            type: "spring",
            delay: 0.2,
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0,
          },
        }}
      >
        .
      </motion.p>
    </motion.div>
  );
};

export default CommandPlaceholder;
