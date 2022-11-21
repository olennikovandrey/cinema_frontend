/* eslint-disable no-debugger */
export const sessionDate = (sessionData) => {
  return sessionData.date.split(" ")[0];
};

export const roomTitle = (roomData) => {
  return roomData.title.includes("1");
};

export const getTotalPrice = selectedSeats => {
  const prices = [];
  selectedSeats.forEach(item => prices.push(item.price));
  return prices.reduce((acc, price) => acc + price, 0);
};

export const getRows = (room, session) => {
  return room.rows.map((item, index) => ({ ...item, ...session.rows[index] }));
};
