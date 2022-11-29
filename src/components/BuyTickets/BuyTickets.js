/* eslint-disable react-hooks/exhaustive-deps */
import Timer from "./auxiliary components/Timer";
import { massUnselectSeatsFetch } from "./buyTickets.api";
import StripeContainer from "./auxiliary components/StripeContainer";
import GoBack from "../GoBack/GoBack";
import MovieInfo from "../Room/auxiliary components/MovieInfo";
import { getTotalPrice } from "../../services/services";
import SelectedSeats from "../Room/auxiliary components/SelectedSeats";
import { SET_SELECTED_SEATS } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const BuyTickets = () => {
  const selectedSeats = useSelector(state => state.selectedSeats);
  const isLoaderOpen = useSelector(state => state.isLoader);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieInfo } = location.state;
  const { movie } = movieInfo;
  const prevPage = -1;

  useEffect(() => {
    const timer = setTimeout(() => {
      massUnselectSeatsFetch(selectedSeats);
      dispatch({ type: SET_SELECTED_SEATS, payload: [] });
      navigate(prevPage);
    }, 300000);
    return () => { clearTimeout(timer); };
  }, []);

  return (
    <section className="buy-tickets">
      <div className="crop" style={ { background: `url(${ movie.crop }) no-repeat 100% / 100%` } } />
      <GoBack />
      <MovieInfo movieInfo={ movieInfo } />
      <div className="buy-tickets__fields">
        <SelectedSeats editable={ false } />
        <div className="pay-field">
          <Timer />
          <span className="total-price">Стоимость: { getTotalPrice(selectedSeats) }.00 BYN</span>
          <StripeContainer />
        </div>
      </div>
      { isLoaderOpen && <Loader /> }
    </section>
  );
};

export default BuyTickets;
