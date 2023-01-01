import { urls } from "../../../../../constants/constants";
import { doFetch } from "../../../../../services/services";

export const deleteSessionFetch = async (sessionId, cinemaId) => {
  return doFetch(urls.deleteSession, {
    method: "delete",
    body: {
      sessionId,
      cinemaId
    }
  });
};
