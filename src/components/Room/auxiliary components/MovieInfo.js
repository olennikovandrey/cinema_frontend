import SocketModal from "./SocketModal";
import { sessionDate, roomTitle } from "../room.services";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const MovieInfo = ({ movieInfo, setIsSocketModalOpen, isSocketModalOpen, socketMsg, getRoom }) => {
  const { movie, room, session } = movieInfo;

  return (
    <div className="movie-info">
      <Link to={ `/movies/id/${ movie._id }` }>
        <img className="movie-info__image" src={ movie.image } alt={ movie.title } />
      </Link>
      <div className="movie-info__description">
        <h1 className="description-movie-title">{ movie.title }</h1>
        <div className="description-room">
          <p className="description-room-title">г. Минск, { room.cinemaTitle } / { roomTitle(room) ? "Зал 1" : "Зал 2" }</p>
        </div>
        <div className="description-date" data-date={ sessionDate(session) }>
          <p className="description-date-title">{ session.date } { session.time } <span>{ movie.age }</span></p>
        </div>
      </div>
      <SocketModal
        socketMsg={ socketMsg }
        setIsSocketModalOpen={ setIsSocketModalOpen }
        isSocketModalOpen={ isSocketModalOpen }
        getRoom={ getRoom }
      />
    </div>
  );
};

export default MovieInfo;

MovieInfo.propTypes = {
  movieInfo: PropTypes.object,
  isSocketModalOpen: PropTypes.bool,
  socketMsg: PropTypes.string,
  getRoom: PropTypes.func,
  setIsSocketModalOpen: PropTypes.func
};
