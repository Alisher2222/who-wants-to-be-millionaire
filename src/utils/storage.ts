import type {
  LocalStorageType,
  LocalStorageKeyType,
  HintType,
  QuestionType,
  QuizCardType,
} from "../types";

export const createStorage = (id: string) => {
  if (!id.trim()) throw Error("Give valid id!");

  const currentState = localStorage.getItem(id);

  if (!currentState) {
    localStorage.setItem(id, JSON.stringify({}));
  }
};
export const updateState = <K extends LocalStorageKeyType>(
  id: string,
  key: K,
  value: LocalStorageType[K],
) => {
  try {
    if (!id.trim()) throw Error("give valid not null id!");

    const response = localStorage.getItem(id);

    if (!response)
      throw Error(`generate localStorage! Key - ${key} value - ${value}`);

    const data: LocalStorageType = JSON.parse(response);

    switch (key) {
      case "questions":
        if (Array.isArray(value)) {
          data.questions = value as QuestionType[];
        }
        break;

      case "currentPrize":
        if (typeof value === "number") {
          if (value <= 15 && value >= 1) {
            data.currentPrize = value;
          } else {
            throw Error("Too big number");
          }
        }

        break;

      case "time":
        if (typeof value === "number") {
          if (value > 0) {
            data.time = value;
          } else {
            throw Error("Enter valid time");
          }
        }

        break;

      case "hintState":
        if (!data.hintState) {
          data.hintState = [];
        }

        if (Array.isArray(value)) {
          data.hintState = value as HintType[];
        }

        break;
      case "intervalId":
        if (typeof value === "number") {
          data.intervalId = value;
        }
        break;
      case "description":
        if (typeof value !== "string") return;
        data.description = value;
        break;
      case "title":
        if (typeof value !== "string") return;
        data.title = value;
        break;

      default:
        const check: never = key;

        return check;
    }

    localStorage.removeItem(id);
    localStorage.setItem(id, JSON.stringify(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(`Error occured: ${error}`);
    }
  }
};

export const getState = <K extends LocalStorageKeyType>(
  id: string,
  key: K,
): LocalStorageType[K] | null => {
  try {
    if (!id.trim() && !key.trim()) throw Error("Enter valid id and key!");

    const response = localStorage.getItem(id);

    if (!response) throw Error(`generate LocalStorage! key - ${key}`);

    return (JSON.parse(response) as LocalStorageType)[key];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const deleteState = (id: string) => {
  localStorage.removeItem(id);
};

export const getCardData = (): QuizCardType[] => {
  const array: QuizCardType[] = [];

  for (const key of Object.keys(localStorage)) {
    const response = localStorage.getItem(key);
    if (!response) continue;

    const data = JSON.parse(response);

    if (data) {
      const { title, description } = data;
      array.push({ id: key, title, description });
    }
  }

  return array;
};
