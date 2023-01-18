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

export const occupySeatFetch = async (seatsToBuy) => {
  return doFetch(urls.occupySeat, {
    method: "put",
    body: seatsToBuy
  });
};

export const massUnselectSeatsFetch = async (selectedSeats) => {
  return doFetch(urls.massUnselectSeats, {
    method: "put",
    body: selectedSeats
  });
};
