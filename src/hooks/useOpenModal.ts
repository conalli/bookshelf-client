import { useAtomValue, useSetAtom } from "jotai";
import { modalOpenAtom } from "../store/modal";

export const useOpenModal = () => {
  const isOpen = useAtomValue(modalOpenAtom);
  const setIsOpen = useSetAtom(modalOpenAtom);
  return { isOpen, setIsOpen };
};
