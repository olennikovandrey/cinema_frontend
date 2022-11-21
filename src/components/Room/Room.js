import Seatings from "./auxiliary components/Seatings";
import SeatTypes from "./auxiliary components/SeatTypes.js";
import MovieInfo from "./auxiliary components/MovieInfo.js";
import { getExactRoomFetch, selectSeatFetch } from "./room.api";
import BuyTickets from "./auxiliary components/BuyTickets";
import { getRows } from "./room.services";
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
  const [rows, setRows] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { cinemaId, roomId, movieId } = useParams();
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const dispatch = useDispatch();


  const getRoom = async (cinemaId, roomId, movieId) => {
    const url = `${ baseUrl }/room/id/cinemaId=${ cinemaId }&roomId=${ roomId }&movieId=${ movieId }`;
    const { room, movie, session } = await getExactRoomFetch(url);
    const rows = getRows(room, session);
    setRows(rows);
    setRoom(room);
    setMovie(movie);
    setSession(session);
  };

  const selectFetch = async seat => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    const { session } = await selectSeatFetch(seat);
    const rows = getRows(room, session);
    setRows(rows);
    setSession(session);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  };

  const unselectSeatHandler = async (seat) => {
    const seats = [...selectedSeats];
    const dublicateIndex = seats.findIndex(({ rowNumber, seatNumber }) => rowNumber === seat.rowNumber && seatNumber === seat.seatNumber);
    seats.splice(dublicateIndex, 1);
    setSelectedSeats(seats);
    await selectFetch(seat);
  };

  const selectSeatHandler = async (seat) => {
    const isSeatAlreadySelected = selectedSeats.some(item =>
      item.rowNumber === seat.rowNumber && item.seatNumber === seat.seatNumber
    );

    if (isSeatAlreadySelected) {
      unselectSeatHandler(seat);
      return;
    } else {
      const seats = [...selectedSeats];
      seat.isSelected && seats.push(seat);
      setSelectedSeats(seats);
      await selectFetch(seat);
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
            <Seatings
              sessionId={ session._id }
              rows={ rows }
              cinemaTitle={ room.cinemaTitle }
              cinemaId={ cinemaId }
              selectSeatHandler={ selectSeatHandler }
            />
            { !selectedSeats.length ?
              <SeatTypes /> :
              <BuyTickets
                sessionId={ session._id }
                cinemaId={ cinemaId }
                selectedSeats={ selectedSeats }
                unselectSeatHandler={ unselectSeatHandler }

              />
            }
          </section>
        </section>
      }
    </>
  );
};

export default Room;
