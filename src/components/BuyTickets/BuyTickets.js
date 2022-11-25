/* eslint-disable react-hooks/exhaustive-deps */
import Timer from "./Timer";
import { massUnselectSeatsFetch, occupiSeatsFetch } from "./buyTickets.api";
import GoBack from "../GoBack/GoBack";
import MovieInfo from "../Room/auxiliary components/MovieInfo";
import { getTotalPrice } from "../../services/services";
import SelectedSeats from "../Room/auxiliary components/SelectedSeats";
import { SET_SELECTED_SEATS } from "../../store/actions/action-types";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const BuyTickets = () => {
  const selectedSeats = useSelector(state => state.selectedSeats);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieInfo } = location.state;
  const { movie,/*  room, session */ } = movieInfo;
  console.log(location);

  useEffect(() => {
    const timer = setTimeout(() => {
      massUnselectSeatsFetch(selectedSeats);
      dispatch({ type: SET_SELECTED_SEATS, payload: [] });
      navigate(-1);
    }, 300000);
    return () => { clearTimeout(timer); };
  }, []);

  const buyTickets = () => {
    occupiSeatsFetch(selectedSeats);
    dispatch({ type: SET_SELECTED_SEATS, payload: [] });
    navigate(-2);
  };

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
          <button className="button-pink" onClick={ () => buyTickets() }>Купить</button>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;
