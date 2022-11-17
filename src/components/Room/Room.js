import Seatings from "./auxiliary components/Seatings";
import SeatTypes from "./auxiliary components/SeatTypes.js";
import MovieInfo from "./auxiliary components/MovieInfo.js";
import { getExactRoomFetch } from "./room.api";
import { baseUrl } from "../../constants/constants";
import HomeLink from "../HomeLink/HomeLink";
import { CHECK_IS_LOADER_OPEN } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const Room = () => {
  const [room, setRoom] = useState();
  const [movie, setMovie] = useState();
  const [session, setSession] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { cinemaId, roomId, movieId } = useParams();
  const dispatch = useDispatch();

  const getRoomData = async (cinemaId, roomId, movieId) => {
    const url = `${ baseUrl }/room/id/cinemaId=${ cinemaId }&roomId=${ roomId }&movieId=${ movieId }`;
    const { room, movie, session } = await getExactRoomFetch(url);
    setRoom(room);
    setMovie(movie);
    setSession(session);
  };

  useEffect(() => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    getRoomData(cinemaId, roomId, movieId);
    setIsLoaded(true);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  }, [cinemaId, roomId, movieId, dispatch]);

  return (
    <>
      { !isLoaded && <Loader /> }
      <HomeLink />
      {
        room && movie &&
        <section className="room">
          <div className="crop" style={ { background: `url(${ movie.crop }) no-repeat 100% / 100%` } }></div>
          <MovieInfo room={ room } movie={ movie } session={ session } />
          <section className="seatings-types">
            <Seatings room={ room }/>
            <SeatTypes />
          </section>
        </section>
      }
    </>
  );
};

export default Room;
