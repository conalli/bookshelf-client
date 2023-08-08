import type { Message } from "@bookshelf-client/hooks";
import { motion } from "framer-motion";

type ErrorNotificationProps = {
  errorMessage: Message;
  closeErrorMessage: (id: string) => void;
};

export function ErrorNotification({
  errorMessage,
  closeErrorMessage,
}: ErrorNotificationProps) {
  const { message, id } = errorMessage;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="border-bk-red m-3 h-24 w-72 appearance-none rounded border-4 bg-red-500 shadow-md hover:cursor-pointer dark:bg-red-500"
      onClick={() => closeErrorMessage(id)}
    >
      <div className="grid h-full w-full grid-cols-1 grid-rows-[1fr_4fr] p-1">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Error:</h3>
        </div>
        <p>{message}</p>
      </div>
    </motion.li>
  );
}
