import { doFetch } from "../../services/services";
import { urls } from "../../constants/constants";

export const massUnselectSeatsFetch = async (selectedSeats) => {
  return doFetch(urls.massUnselectSeats, {
    method: "put",
    body: selectedSeats
  });
};
export const occupiSeatsFetch = async (selectedSeats) => {
  return doFetch(urls.occupiseat, {
    method: "put",
    body: selectedSeats
  });
};
