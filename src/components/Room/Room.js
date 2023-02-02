/* eslint-disable react-hooks/exhaustive-deps */
import Seatings from "./auxiliary components/Seatings";
import SeatTypes from "./auxiliary components/SeatTypes.js";
import MovieInfo from "./auxiliary components/MovieInfo.js";
import { getExactRoomFetch, selectSeatFetch } from "./room.api";
import SelectedSeats from "./auxiliary components/SelectedSeats";
import { getRows } from "./room.services";
import EmailModal from "./auxiliary components/EmailModal";
import { baseUrl, baseWebSocketUrl } from "../../constants/constants";
import GoBack from "../GoBack/GoBack";
import { CHECK_IS_LOADER_OPEN, SET_SELECTED_SEATS, SET_CURRENT_SESSION_ID, CLEAR_SEAT_FROM_SOCKET, SET_USER_ID } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import { socket } from "../Main/Main";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Room = () => {
  const [room, setRoom] = useState();
  const [movie, setMovie] = useState();
  const [session, setSession] = useState();
  const [rows, setRows] = useState();
  const { cinemaId, roomId, movieId, sessionId } = useParams();
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const isEmailModalOpen = useSelector(state => state.isEmailModalOpen);
  const selectedSeats = useSelector(state => state.selectedSeats);
  const userEmail = useSelector(state => state.userData.email);
  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();

  const movieInfo = { room, movie, session };

  const getRoom = async () => {
    const url = `${ baseUrl }/room/id/cinemaId=${ cinemaId }&roomId=${ roomId }&movieId=${ movieId }&sessionId=${ sessionId }`;
    const { room, movie, session } = await getExactRoomFetch(url);
    const rows = getRows(room, session);
    setRows(rows);
    setRoom(room);
    setMovie(movie);
    setSession(session);
    dispatch({ type: SET_CURRENT_SESSION_ID, payload: session._id });
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

  const selectSeatHandler = async seat => {
    await selectFetch(seat);
    dispatch({ type: SET_SELECTED_SEATS, payload: seat });
    const { sessionId } = seat;
    const isSeatAlreadySelected = selectedSeats.find(item =>
      item.sessionId === sessionId && item.rowNumber === seat.rowNumber && item.seatNumber === seat.seatNumber
    );

    if (isSeatAlreadySelected) {
      socket.emit("seatSelect", seat, roomId, movieId, cinemaId);
    } else {
      socket.emit("seatUnselect", seat, roomId, movieId, cinemaId);
    }
  };

  useEffect(() => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    getRoom();
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });

    if (!userId) {
      const socket = io(`wss://${ baseWebSocketUrl }`);
      socket.on("connect", () => {
        dispatch({ type: SET_USER_ID, payload: socket.id });
      });
    }

    socket.on("seatSelect", (room, session) => {
      const rows = getRows(room, session);
      setSession(session);
      setRows(rows);
    });

    socket.on("clearSelectedSeat", ({ sessionId, rowNumber, seatNumber }) => {
      dispatch({ type: CLEAR_SEAT_FROM_SOCKET, payload: { sessionId, rowNumber, seatNumber } });
    });

    return () => {
      socket.off("connect");
      socket.emit("leaveTheRoom");
    };
  }, []);

  return (
    <>
      { isLoaderOpen && <Loader /> }
      { isEmailModalOpen && !userEmail && <EmailModal /> }
      <GoBack />
      {
        room && movie &&
        <section className={ `room ${ isEmailModalOpen ? "blur" : "" }` }>
          <div className="crop" style={ { background: `url(${ movie.crop }) no-repeat` } }></div>
          <MovieInfo
            movieInfo={ movieInfo }
            isInfoModalOpen={ true }
          />
          <section className="seatings-types">
            <Seatings
              sessionId={ session._id }
              rows={ rows }
              cinemaTitle={ room.cinemaTitle }
              cinemaId={ cinemaId }
              selectSeatHandler={ selectSeatHandler }
            />
            { selectedSeats.some(item => item.sessionId === sessionId) ?
              <SelectedSeats
                sessionId={ session._id }
                cinemaId={ cinemaId }
                unselectSeatHandler={ selectSeatHandler }
                movieInfo={ movieInfo }
              /> :
              <SeatTypes />
            }
          </section>
        </section>
      }
    </>
  );
};

export default Room;
