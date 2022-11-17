import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const addMovieFetch = async (movie) => {
  return doFetch(urls.addMovie, {
    method: "post",
    body: movie
  });
};
