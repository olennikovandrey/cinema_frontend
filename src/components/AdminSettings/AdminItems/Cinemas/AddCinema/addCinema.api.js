import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const addCinemaFetch = async (cinemaData) => {
  return doFetch(urls.addCinema, {
    method: "post",
    body: cinemaData
  });
};
