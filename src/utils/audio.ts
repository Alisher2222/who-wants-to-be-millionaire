import type { AudioType } from "../types";

import correctSound from "../assets/sounds/correct.mp3";
import failureSound from "../assets/sounds/failure.mp3";
import beginningSound from "../assets/sounds/beginning.mp3";
import callFriendSound from "../assets/sounds/callFriend.mp3";
import fiftyFiftySound from "../assets/sounds/fiftyFifty.mp3";
import winSound from "../assets/sounds/win.mp3";
import audienceHelpSound from "../assets/sounds/audienceHelp.mp3";

const correct = new Audio(correctSound);
const failure = new Audio(failureSound);
const beginning = new Audio(beginningSound);
const callFriend = new Audio(callFriendSound);
const win = new Audio(winSound);
const fiftyFifty = new Audio(fiftyFiftySound);
const audienceHelp = new Audio(audienceHelpSound);

export const stopAllAudio = (): void => {
  [correct, failure, beginning, callFriend, win, audienceHelp].forEach(
    (audio) => {
      audio.pause();
      audio.currentTime = 0;
    },
  );
};

export const playAudio = (name: AudioType): void => {
  stopAllAudio();

  switch (name) {
    case "correct":
      correct.play();
      break;
    case "failure":
      failure.play();
      break;
    case "beginning":
      beginning.play();
      break;
    case "callFriend":
      callFriend.play();
      break;
    case "win":
      win.play();
      break;
    case "fiftyFifty":
      fiftyFifty.play();
      break;
    case "audienceHelp":
      audienceHelp.play();
      break;
    default:
      const check: never = name;
      return check;
  }
};

export const stopAudio = (name: AudioType): void => {
  switch (name) {
    case "correct":
      correct.pause();
      correct.currentTime = 0;
      break;
    case "failure":
      failure.pause();
      failure.currentTime = 0;
      break;
    case "beginning":
      beginning.pause();
      beginning.currentTime = 0;
      break;
    case "callFriend":
      callFriend.pause();
      callFriend.currentTime = 0;
      break;
    case "win":
      win.pause();
      win.currentTime = 0;
      break;
    case "audienceHelp":
      audienceHelp.pause();
      audienceHelp.currentTime = 0;
      break;
  }
};

export const changeVolume = (volume: number): void => {
  if (volume > 1 || volume < 0) return;

  [correct, failure, beginning, callFriend, win, audienceHelp].forEach(
    (audio) => (audio.volume = volume),
  );
};
