import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ReactModal from "react-modal";
import { useModal } from "../../../hooks/useModal";

ReactModal.setAppElement("#__next");

type ModalProps = {
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isOpen, setIsOpen } = useModal();
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={false}
      contentElement={() => (
        <motion.div className="bk-background flex h-screen w-screen flex-col items-center justify-center">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="mx-2 rounded bg-white p-2 shadow-md dark:bg-neutral-800 lg:mx-8"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    />
  );
};

export default Modal;
