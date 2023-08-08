import { useAtomValue, useSetAtom } from "jotai";
import { modalOpenAtom, modalTypeAtom } from "../store/modal";

export const useModal = () => {
  const isOpen = useAtomValue(modalOpenAtom);
  const setIsOpen = useSetAtom(modalOpenAtom);
  const modalType = useAtomValue(modalTypeAtom);
  const setModalType = useSetAtom(modalTypeAtom);
  return { isOpen, setIsOpen, modalType, setModalType };
};
