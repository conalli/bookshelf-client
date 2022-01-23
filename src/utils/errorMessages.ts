import { nanoid } from "nanoid";
import { ErrorMessage } from "../hooks/useAuth";

export const createErrorMessage = (error: string): ErrorMessage => ({
  id: nanoid(),
  error,
});

export const removeErrorMessage = (arr: ErrorMessage[], id: string) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex((i) => i.id === id),
    1
  );
  return newArr;
};
