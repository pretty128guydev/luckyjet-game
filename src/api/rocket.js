export const getRocketData = async () => {
  const response = await fetch("https://lucky-jet-history.gamedev-atech.cc/public/history/api/history/replay");
  const data = await response.json();
  return data;
};
