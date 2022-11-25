/* eslint-disable no-debugger */
export const sessionDate = (sessionData) => {
  return sessionData.date.split(" ")[0];
};

export const roomTitle = (roomData) => {
  return roomData.title.includes("1");
};

export const getRows = (room, session) => {
  return room.rows.map((item, index) => ({ ...item, ...session.rows[index] }));
};
