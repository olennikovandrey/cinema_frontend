import { urls } from "../../constants/constants";
import { doFetch } from "../../services/services";

export const checkIsAuthFetch = async () => {
  return doFetch(urls.checkIsAuth);
};
