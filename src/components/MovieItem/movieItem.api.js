import { doFetch } from "../../services/services";

export const getExactMovieFetch = async (url) => {
  return doFetch(url);
};
