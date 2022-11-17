import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const updateMovieFetch = async (movie) => {
  return doFetch(urls.updateMovie, {
    method: "put",
    body: movie
  });
};

export const getAllMoviesFetch = async () => {
  return doFetch(urls.getAllMovies);
};
