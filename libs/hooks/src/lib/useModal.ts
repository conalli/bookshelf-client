import { modalOpenAtom, modalTypeAtom } from "@bookshelf-client/store";
import { useAtomValue, useSetAtom } from "jotai";

export const useModal = () => {
  const isOpen = useAtomValue(modalOpenAtom);
  const setIsOpen = useSetAtom(modalOpenAtom);
  const modalType = useAtomValue(modalTypeAtom);
  const setModalType = useSetAtom(modalTypeAtom);
  return { isOpen, setIsOpen, modalType, setModalType };
};
