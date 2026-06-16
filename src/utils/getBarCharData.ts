import type { BarChartType, ButtonOptions } from "../types";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getBarChartData = (rightOption: ButtonOptions): BarChartType[] => {
  const result: BarChartType[] = [];
  let totalPercentage = 100;

  let options: ButtonOptions[] = ["A", "B", "C", "D"];

  const rightOptionPercentage = getRandomInt(40, 50);
  totalPercentage -= rightOptionPercentage;

  for (const option of options) {
    if (option === rightOption) {
      result.push({ name: option, value: rightOptionPercentage });
      continue;
    }

    const percentage = getRandomInt(0, totalPercentage);
    totalPercentage -= percentage;

    result.push({ name: option, value: percentage });
  }
  return result;
};
