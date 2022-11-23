import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const updateCinemaFetch = async (updatedCinema) => {
  return doFetch(urls.updateCinema, {
    method: "put",
    body: {
      updatedCinema
    }
  });
};

export const getAllCinemasFetch = async () => {
  return doFetch(urls.getAllCinemas);
};

export const getAllRoomsFetch = async () => {
  return doFetch(urls.getAllRooms);
};
