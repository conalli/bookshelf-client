import { motion } from "framer-motion";
import { ReactNode } from "react";
import ReactModal from "react-modal";
import { useModal } from "../../hooks/useModal";

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
        <motion.div className="bk-background flex flex-col h-screen w-screen items-center justify-center">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-neutral-800 mx-2 p-2 lg:mx-8 rounded shadow-md"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    />
  );
};

export default Modal;
