import type { HintType, ButtonProps } from "../types";
import { IoIosPeople, IoIosCall } from "react-icons/io";

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
    icon: IoIosPeople,
    variant: "hint",
    iconStyle: { size: 50, color: "#FEDA1E" },
  },
  {
    id: "callFriend",
    isUsed: false,
    icon: IoIosCall,
    variant: "hint",
    iconStyle: { size: 50, color: "#FEDA1E" },
  },
];

export const currentPrizeDefault = 1;
