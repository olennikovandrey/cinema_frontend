import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const updateSessionFetch = async updatedSession => {
  return doFetch(urls.updateSession, {
    method: "put",
    body: {
      updatedSession
    }
  });
};
