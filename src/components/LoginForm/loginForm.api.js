import { urls } from "../../constants/constants";
import { doFetch } from "../../services/services";

export const loginFetch = async (user) => {
  return doFetch(urls.login, {
    method: "post",
    body: user
  });
};
