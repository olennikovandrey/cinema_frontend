import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const addSessionFetch = async session => {
  return doFetch(urls.addSession, {
    method: "post",
    body: {
      session
    }
  });
};
