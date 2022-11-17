import { urls } from "../../constants/constants";
import { doFetch } from "../../services/services";

export const registerFetch = async (user) => {
  return doFetch(urls.register, {
    method: "post",
    body: user
  });
};
