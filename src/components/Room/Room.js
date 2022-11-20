/* eslint-disable no-debugger */
import Seatings from "./auxiliary components/Seatings";
import SeatTypes from "./auxiliary components/SeatTypes.js";
import MovieInfo from "./auxiliary components/MovieInfo.js";
import { getExactRoomFetch } from "./room.api";
import { selectSeatFetch } from "./room.api";
import BuyTickets from "./auxiliary components/BuyTickets";
import { baseUrl } from "../../constants/constants";
import HomeLink from "../HomeLink/HomeLink";
import { CHECK_IS_LOADER_OPEN } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Room = () => {
  const [room, setRoom] = useState();
  const [movie, setMovie] = useState();
  const [session, setSession] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { cinemaId, roomId, movieId } = useParams();
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const dispatch = useDispatch();

  const getRoom = async (cinemaId, roomId, movieId) => {
    const url = `${ baseUrl }/room/id/cinemaId=${ cinemaId }&roomId=${ roomId }&movieId=${ movieId }`;
    const { room, movie, session } = await getExactRoomFetch(url);
    setRoom(room);
    setMovie(movie);
    setSession(session);
  };

  const selectFetch = async seat => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    const { room } = await selectSeatFetch(seat);
    setRoom(room);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  };

  const unselectSeat = (seat) => {
    const seats = [...selectedSeats];
    const dublicateIndex = seats.findIndex(({ rowNumber, seatNumber }) => rowNumber === seat.rowNumber && seatNumber === seat.seatNumber);
    seats.splice(dublicateIndex, 1);
    setSelectedSeats(seats);
    selectFetch(seat);
  };

  const selectSeatHandler = (seat) => {
    const isSeatAlreadySelected = selectedSeats.some(item =>
      item.rowNumber === seat.rowNumber && item.seatNumber === seat.seatNumber
    );

    if (isSeatAlreadySelected) {
      unselectSeat(seat);
      return;
    } else {
      const seats = [...selectedSeats];
      seat.isSelected && seats.push(seat);
      setSelectedSeats(seats);
      selectFetch(seat);
    }
  };

  useEffect(() => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    getRoom(cinemaId, roomId, movieId);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  }, [cinemaId, roomId, movieId, dispatch]);

  return (
    <>
      { isLoaderOpen && <Loader /> }
      <HomeLink />
      {
        room && movie &&
        <section className="room">
          <div className="crop" style={ { background: `url(${ movie.crop }) no-repeat 100% / 100%` } }></div>
          <MovieInfo room={ room } movie={ movie } session={ session } />
          <section className="seatings-types">
            <Seatings room={ room } selectSeatHandler={ selectSeatHandler }/>
            { !selectedSeats.length ?
              <SeatTypes /> :
              <BuyTickets roomId={ roomId } selectedSeats={ selectedSeats } unselectSeat={ unselectSeat } />
            }
          </section>
        </section>
      }
    </>
  );
};

export default Room;
