import { doFetch } from "../../services/services";

export const getExactRoomFetch = async (url) => {
  return doFetch(url);
};
