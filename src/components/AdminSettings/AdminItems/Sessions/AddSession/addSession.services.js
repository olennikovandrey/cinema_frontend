export const getCinemaRooms = (cinema, selectedCinemaId) => {
  return cinema.find(({ _id }) => _id === selectedCinemaId).rooms;
};
