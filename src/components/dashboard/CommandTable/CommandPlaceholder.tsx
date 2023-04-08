import { motion } from "framer-motion";

const CommandPlaceholder = () => {
  return (
    <motion.div className="relative flex h-full w-full items-center justify-center text-3xl">
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
