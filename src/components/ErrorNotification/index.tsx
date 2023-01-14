import React from "react";
import { motion } from "framer-motion";
import { Message } from "../../hooks/useMessages";

type ErrorNotificationProps = {
  errorMessage: Message;
  closeErrorMessage: (id: string) => void;
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  closeErrorMessage,
}) => {
  const { message, id } = errorMessage;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="appearance-none w-72 h-24 m-3 bg-red-500 dark:bg-red-500 rounded shadow-md border-4 border-bk-red hover:cursor-pointer"
      onClick={() => closeErrorMessage(id)}
    >
      <div className="h-full w-full grid grid-cols-1 grid-rows-[1fr_4fr] p-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">Error:</h3>
        </div>
        <p>{message}</p>
      </div>
    </motion.li>
  );
};

export default ErrorNotification;
