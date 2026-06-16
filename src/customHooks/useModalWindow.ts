import { useState } from "react";

export const useModalWindow = () => {
  const [state, setState] = useState<boolean>(false);

  const openModalWindow = () => setState(true);
  const closeModalWindow = () => setState(false);

  return [state, openModalWindow, closeModalWindow] as const;
};
