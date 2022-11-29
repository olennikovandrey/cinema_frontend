import { doFetch } from "../../services/services";
import { urls } from "../../constants/constants";

export const massUnselectSeatsFetch = async (selectedSeats) => {
  return doFetch(urls.massUnselectSeats, {
    method: "put",
    body: selectedSeats
  });
};
export const occupySeatsFetch = async (selectedSeats) => {
  return doFetch(urls.occupySeat, {
    method: "put",
    body: selectedSeats
  });
};

export const buyTicketsFetch = async (paymentData) => {
  return doFetch(urls.buyTickets, {
    method: "post",
    body: paymentData
  });
};
