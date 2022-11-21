import { doFetch } from "../../services/services";
import { urls } from "../../constants/constants";

export const getExactRoomFetch = async (url) => {
  return doFetch(url);
};

export const selectSeatFetch = async (updatedSeat) => {
  return doFetch(urls.selectseat, {
    method: "put",
    body: updatedSeat
  });
};

export const occupiSeatFetch = async (seatsToBuy) => {
  return doFetch(urls.occupiseat, {
    method: "put",
    body: seatsToBuy
  });
};
