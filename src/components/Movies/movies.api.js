import { urls } from "../../constants/constants";
import { doFetch } from "../../services/services";

export const getAllMovieFetch = async () => {
  return doFetch(urls.getAllMovies);
};
