import type { User } from "@bookshelf-client/utils";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { NavLinks } from "./NavLinks";

type MobileMenuProps = {
  open: boolean;
  user: User | null;
  handleClose: () => void;
};

export function MobileMenu({ open, user, handleClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          initial={{ x: 100 }}
          animate={{
            x: 0,
            transition: { type: "spring", duration: 0.4, bounce: 0.1 },
          }}
          exit={{ x: 200, transition: { duration: 0.4 } }}
          className="fixed right-0 top-0 z-50 h-screen w-2/5 bg-white shadow-lg dark:bg-neutral-800"
        >
          <div className="flex flex-col gap-2">
            <button
              onClick={handleClose}
              className="flex w-full justify-end p-2"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            <NavLinks user={user} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
