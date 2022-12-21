import { urls } from "../../constants/constants";
import { doFetch } from "../../services/services";

export const getAllCinemasFetch = async () => {
  return doFetch(urls.getAllCinemas);
};

export const getAllRoomsFetch = async () => {
  return doFetch(urls.getAllRooms);
};

export const getAllMoviesFetch = async () => {
  return doFetch(urls.getAllMovies);
};
