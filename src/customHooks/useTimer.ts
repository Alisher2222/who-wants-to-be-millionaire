import { useEffect, useRef } from "react";
import { useLocal } from "./useLocal";
import type { TimerType } from "../types";
import { updateState } from "../utils/storage";

export const useTimer = (id: string, timeDefault: number): TimerType => {
  const [time, setTime] = useLocal({
    key: "time",
    id,
    defaultValue: timeDefault,
  });
  const intervalId = useRef<number | undefined>(undefined);

  const stopTimer = () => {
    if (typeof intervalId.current === "number") {
      clearInterval(intervalId.current);
      intervalId.current = undefined;
    }
  };

  const startTimer = () => {
    if (intervalId.current !== null) stopTimer();
    intervalId.current = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(timeDefault);
  };

  useEffect(() => {
    if (time === 0) stopTimer();
  }, [time]);

  useEffect(() => {
    updateState(id, "intervalId", intervalId.current);
  }, [intervalId.current]);

  return { time, startTimer, stopTimer, resetTimer };
};
