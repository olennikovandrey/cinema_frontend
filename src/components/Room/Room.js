/* eslint-disable react-hooks/exhaustive-deps */
import Seatings from "./auxiliary components/Seatings";
import SeatTypes from "./auxiliary components/SeatTypes.js";
import MovieInfo from "./auxiliary components/MovieInfo.js";
import { getExactRoomFetch, selectSeatFetch, massUnselectSeatsFetch } from "./room.api";
import SelectedSeats from "./auxiliary components/SelectedSeats";
import { getRows } from "./room.services";
import EmailModal from "./auxiliary components/EmailModal";
import { baseUrl } from "../../constants/constants";
import GoBack from "../GoBack/GoBack";
import { CHECK_IS_LOADER_OPEN, SET_SELECTED_SEATS, SET_USER_ID } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("ws://localhost:4000");

const Room = () => {
  const [room, setRoom] = useState();
  const [movie, setMovie] = useState();
  const [session, setSession] = useState();
  const [rows, setRows] = useState();
  const [isSocketModalOpen, setIsSocketModalOpen] = useState(false);
  const [socketMsg, setSocketMsg] = useState("");
  const { cinemaId, roomId, movieId } = useParams();
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const isEmailModalOpen = useSelector(state => state.isEmailModalOpen);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const userEmail = useSelector(state => state.userData.email);
  const dispatch = useDispatch();

  const movieInfo = {
    room,
    movie,
    session
  };

  const getRoom = async (cinemaId, roomId, movieId) => {
    const url = `${ baseUrl }/room/id/cinemaId=${ cinemaId }&roomId=${ roomId }&movieId=${ movieId }`;
    const { room, movie, session } = await getExactRoomFetch(url);
    const rows = getRows(room, session);
    setRows(rows);
    setRoom(room);
    setMovie(movie);
    setSession(session);
    socket.emit("joinTheRoom", session._id);
  };

  const selectFetch = async seat => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    const { session } = await selectSeatFetch(seat);
    const rows = getRows(room, session);
    setRows(rows);
    setSession(session);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  };

  const unselectSeatHandler = async seat => {
    const seats = [...selectedSeats];
    const dublicateIndex = seats.findIndex(({ rowNumber, seatNumber }) => rowNumber === seat.rowNumber && seatNumber === seat.seatNumber);
    const rows = getRows(room, session);
    setRows(rows);
    seats.splice(dublicateIndex, 1);
    dispatch({ type: SET_SELECTED_SEATS, payload: seats });
    await selectFetch(seat);
    socket.emit("seat select event", seat);
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
      socket.emit("seat select event", seat);
    }
  };

  useEffect(() => {
    socket.on("seat select event", socketMsg => {
      setIsSocketModalOpen(true);
      setSocketMsg(socketMsg);
    });
  }, []);

  useEffect(() => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    getRoom(cinemaId, roomId, movieId);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      dispatch({ type: SET_USER_ID, payload: socket.id });
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    return () => {
      if (selectedSeats.length > 0) {
        massUnselectSeatsFetch(selectedSeats);
        dispatch({ type: SET_SELECTED_SEATS, payload: [] });
      }
    };
  }, []);

  return (
    <>
      { isLoaderOpen && <Loader /> }
      { isEmailModalOpen && !userEmail && <EmailModal /> }
      <GoBack />
      {
        room && movie &&
        <section className={ `room ${ isEmailModalOpen ? "blur" : null }` }>
          <div className="crop" style={ { background: `url(${ movie.crop }) no-repeat 100% / 100%` } } />
          <MovieInfo
            movieInfo={ movieInfo }
            setIsSocketModalOpen={ setIsSocketModalOpen }
            isSocketModalOpen={ isSocketModalOpen }
            socketMsg={ socketMsg }
            getRoom={ getRoom }
          />
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
