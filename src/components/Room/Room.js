/* eslint-disable no-console */
import Seatings from "./auxiliary components/Seatings";
import SeatTypes from "./auxiliary components/SeatTypes.js";
import MovieInfo from "./auxiliary components/MovieInfo.js";
import { getExactRoomFetch, selectSeatFetch } from "./room.api";
import SelectedSeats from "./auxiliary components/SelectedSeats";
import { getRows } from "./room.services";
import EmailModal from "./auxiliary components/EmailModal";
import { baseUrl } from "../../constants/constants";
import GoBack from "../GoBack/GoBack";
import { CHECK_IS_LOADER_OPEN, SET_SELECTED_SEATS } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Room = () => {
  const [room, setRoom] = useState();
  const [movie, setMovie] = useState();
  const [session, setSession] = useState();
  const [rows, setRows] = useState();
  const { cinemaId, roomId, movieId } = useParams();
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const isEmailModalOpen = useSelector(state => state.isEmailModalOpen);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const userEmail = useSelector(state => state.userData.email);
  const dispatch = useDispatch();
  const socket = useRef();

  const movieInfo = {
    room: room,
    movie: movie,
    session: session
  };

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
    const rows = getRows(room, session);
    setRows(rows);
    seats.splice(dublicateIndex, 1);
    dispatch({ type: SET_SELECTED_SEATS, payload: seats });
    await selectFetch(seat);
    socket.current.emit("seat select event", { cinemaId, roomId, movieId });
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
      dispatch({ type: SET_SELECTED_SEATS, payload: seats });
      await selectFetch(seat);
      socket.current.emit("seat select event", { cinemaId, roomId, movieId });
    }
  };

  useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.on("seat select event", session => {
      const rows = getRows(room, session);
      setRows(rows);
      setSession(session);
    });
  }, [cinemaId, roomId, movieId, room]);

  useEffect(() => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    getRoom(cinemaId, roomId, movieId);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  }, [cinemaId, roomId, movieId, dispatch]);

  return (
    <>
      { isLoaderOpen && <Loader /> }
      { isEmailModalOpen && !userEmail && <EmailModal /> }
      <GoBack />
      {
        room && movie &&
        <section className={ `room ${ isEmailModalOpen ? "blur" : null }` }>
          <div className="crop" style={ { background: `url(${ movie.crop }) no-repeat 100% / 100%` } }></div>
          <MovieInfo movieInfo={ movieInfo } />
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
              <SelectedSeats
                sessionId={ session._id }
                cinemaId={ cinemaId }
                unselectSeatHandler={ selectSeatHandler }
                movieInfo={ movieInfo }
              />
            }
          </section>
        </section>
      }
    </>
  );
};

export default Room;
