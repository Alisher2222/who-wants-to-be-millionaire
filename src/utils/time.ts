export const secondsToTimeFormat = (seconds: number): string => {
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(mins)}:${pad(secs)}`;
};
