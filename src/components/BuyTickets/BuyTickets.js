import Timer from "./Timer";
import GoBack from "../GoBack/GoBack";
import MovieInfo from "../Room/auxiliary components/MovieInfo";
import { getTotalPrice } from "../../services/services";
import { doFetch } from "../../services/services";
import { urls } from "../../constants/constants";
import SelectedSeats from "../Room/auxiliary components/SelectedSeats";
import { SET_SELECTED_SEATS } from "../../store/actions/action-types";
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const BuyTickets = () => {
  const selectedSeats = useSelector(state => state.selectedSeats);
  const location = useLocation();
  const dispatch = useDispatch();
  const { movieInfo } = location.state;
  const { movie, room, session } = movieInfo;


  /*   const seatsToBuy = async () => {
    const seatsToBuy = selectedSeats;
    seatsToBuy.forEach(item => item.isOccupied = true);

    await doFetch(urls.occupiseat, {
      method: "put",
      body: {
        sessionId,
        seatsToBuy,
      }
    });
  }; */


  return (
    <section className="buy-tickets">
      <div className="crop" style={ { background: `url(${ movie.crop }) no-repeat 100% / 100%` } }></div>
      <GoBack />
      <MovieInfo movieInfo={ movieInfo } />
      <div className="buy-tickets__fields">
        <SelectedSeats editable={ false } />
        <div className="pay-field">
          <div className="timer">
            <div className="timer__image"></div>
            <Timer />
          </div>
          <span className="total-price">Стоимость: { getTotalPrice(selectedSeats) }.00 BYN</span>
          <form>


          </form>
          <button className="button-pink">Купить</button>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;
