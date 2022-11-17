import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const updateCinemaFetch = async (updatedCinema) => {
  return doFetch(urls.deleteCinema, {
    method: "put",
    body: updatedCinema
  });
};

export const getAllCInemasFetch = async () => {
  return doFetch(urls.getAllCinemas);
};

export const getAllRoomsFetch = async () => {
  return doFetch(urls.getAllRooms);
};
