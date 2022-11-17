import { doFetch } from "../../services/services";

export const searchFetch = async (url) => {
  return doFetch(url);
};
