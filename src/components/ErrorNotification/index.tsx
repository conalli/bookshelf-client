import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { ErrorMessage } from "../../hooks/useAuth";
import { motion } from "framer-motion";

type ErrorNotificationProps = {
  error: ErrorMessage;
  closeErrorMessage: (id: string) => void;
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  error,
  closeErrorMessage,
}) => {
  const { error: message, id } = error;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="appearance-none w-72 h-24 m-3 bg-white dark:bg-neutral-800 rounded shadow-md border-4 border-bk-red"
    >
      <div className="h-full w-full grid grid-cols-1 grid-rows-[1fr_4fr] p-1">
        <div className="flex justify-between items-start">
          <h3 className="text-bk-red text-lg font-semibold">Error:</h3>
          <button onClick={() => closeErrorMessage(id)}>
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <p>{message}</p>
      </div>
    </motion.li>
  );
};

export default ErrorNotification;
