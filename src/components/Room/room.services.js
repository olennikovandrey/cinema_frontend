export const sessionDate = (sessionData) => {
  return sessionData.date.split(" ")[0];
};

export const roomTitle = (roomData) => {
  return roomData.title.includes("1");
};
