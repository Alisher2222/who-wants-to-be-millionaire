import { GameContext } from "../context/GameContext";
import { useContext } from "react";

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw Error("useGame must be used within an AppProvider");
  }

  return context;
};
