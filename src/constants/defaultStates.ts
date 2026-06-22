import type { HintType, ButtonProps } from "../types";
import { IoIosCall, IoIosPeople } from "react-icons/io";

export const timeDefault = 30;

export const hintStateDefault: (HintType & ButtonProps)[] = [
  {
    id: "fiftyFifty",
    isUsed: false,
    icon: "50:50",
    variant: "hint",
    iconStyle: { size: 20, color: "#FEDA1E" },
  },
  {
    id: "askTheAudience",
    isUsed: false,
    icon: "Помощь зала",
    variant: "hint",
    iconStyle: { size: 20, color: "#FEDA1E" },
  },
  {
    id: "callFriend",
    isUsed: false,
    icon: "звонок другу",
    variant: "hint",
    iconStyle: { size: 20, color: "#FEDA1E" },
  },
];

export const currentPrizeDefault = 1;
