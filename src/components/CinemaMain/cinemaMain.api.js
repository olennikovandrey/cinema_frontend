import { urls } from "../../constants/constants";
import { doFetch } from "../../services/services";

export const deleteCinemaFetch = async (title) => {
  return doFetch(urls.deleteCinema, {
    method: "delete",
    body: { title }
  });
};

export const getAllCInemasFetch = async () => {
  return doFetch(urls.getAllCinemas);
};
