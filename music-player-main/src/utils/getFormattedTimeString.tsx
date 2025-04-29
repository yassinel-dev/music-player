const getFormattedTimeString = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = String(Math.floor(timeInSeconds % 60)).padStart(2, "0");
  return ` ${minutes}:${seconds} `;
};

export default getFormattedTimeString;
