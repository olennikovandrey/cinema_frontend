import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieItemIntoCinema = ({ date, time, movieId, roomId, cinemaRooms, cinemaId }) => {
  const movies = useSelector(state => state.movies);
  const getCurrent = id => ({ _id }) => _id === id;
  const currentMovie = movies.filter(getCurrent(movieId))[0];

  const isFirstRoom = () => {
    const currentRoomTitle = cinemaRooms.filter(getCurrent(roomId))[0].title;
    return currentRoomTitle.includes("1");
  };

  return (
    <>
      {
        currentMovie &&
        <div className="session-wrapper">
          <Link to={ `/movies/id/${ movieId }` }>
            <div className="session-wrapper__image">
              <img src={ currentMovie.image } alt={ currentMovie.title } />
            </div>
          </Link>
          <div className="session-description">
            <h2>{ currentMovie.title }</h2>
            <p className="session-description__row">{ date }</p>
            <p className="session-description__row">{ time }</p>
            <p className="session-description__row">{ isFirstRoom ? "Зал 1" : "Зал 2" }</p>
            <Link to={ `/room/id/cinemaId=${ cinemaId }/roomId=${ roomId }/movieId=${ movieId }` }>
              <button>Купить билет</button>
            </Link>
          </div>
        </div>
      }
    </>
  );
};

export default MovieItemIntoCinema;

MovieItemIntoCinema.propTypes = {
  date: PropTypes.string,
  cinemaId: PropTypes.string,
  time: PropTypes.string,
  movieId: PropTypes.string,
  roomId: PropTypes.string,
  cinemaRooms: PropTypes.array
};
