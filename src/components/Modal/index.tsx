import { motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
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
            className="bg-white dark:bg-neutral-900 mx-2 p-2 lg:mx-8 rounded shadow-md"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    />
  );
};

export default Modal;
