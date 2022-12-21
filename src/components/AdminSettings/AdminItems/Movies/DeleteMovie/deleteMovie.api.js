import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const deleteMovieFetch = async (title) => {
  return doFetch(urls.deleteMovie, {
    method: "delete",
    body: { title }
  });
};
