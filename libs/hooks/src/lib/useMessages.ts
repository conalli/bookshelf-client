"use client";

import { atom, useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback } from "react";

export type Message = {
  id: string;
  message: string;
  isError: boolean;
};

const messageAtom = atom<Message[]>([]);

const create = (message: string, isError: boolean): Message => ({
  id: nanoid(),
  message,
  isError,
});

const remove = (arr: Message[], id: string) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex((i) => i.id === id),
    1
  );
  return newArr;
};

export const useMessages = () => {
  const [messages, setMessages] = useAtom(messageAtom);
  const addMessage = useCallback(
    (message: string, isError = false) =>
      setMessages((prev) => [...prev, create(message, isError)]),
    [setMessages]
  );

  const removeMessage = useCallback(
    (id: string) => setMessages((prev) => remove(prev, id)),
    [setMessages]
  );

  const removeMessageFIFO = useCallback(
    () =>
      setMessages((prev) =>
        prev.length > 1 ? prev.filter((_, idx) => idx !== 0) : []
      ),
    [setMessages]
  );

  return { messages, addMessage, removeMessage, removeMessageFIFO };
};
