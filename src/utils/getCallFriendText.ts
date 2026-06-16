import { friendAnswerTemplates } from "../constants/callFriend";
import type { ButtonOptions } from "../types";

export const getCallFriendText = (rightAnswer: ButtonOptions) => {
  const index = Math.floor(Math.random() * friendAnswerTemplates.length);
  const answer = friendAnswerTemplates[index].replace(
    "{rightAnswer}",
    rightAnswer,
  );
  return answer;
};
