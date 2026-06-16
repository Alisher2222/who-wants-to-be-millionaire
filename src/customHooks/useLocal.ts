import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { getState, updateState } from "../utils/storage";
import type {
  UseLocalProps,
  LocalStorageKeyType,
  LocalStorageType,
} from "../types";

export const useLocal = function <K extends LocalStorageKeyType>({
  key,
  id,
  defaultValue,
}: UseLocalProps<K>): [
  LocalStorageType[K],
  Dispatch<SetStateAction<LocalStorageType[K]>>,
] {
  const [value, setValue] = useState<LocalStorageType[K]>(() => {
    const state = getState(id, key);

    if (!state) {
      updateState(id, key, defaultValue);
      return defaultValue;
    }

    return state;
  });

  useEffect(() => {
    updateState(id, key, value);
  }, [value]);
  return [value, setValue] as const;
};
