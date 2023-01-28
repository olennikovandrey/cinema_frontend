import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieItemIntoCinema = ({ date, time, movieId, roomId, cinemaRooms, cinemaId, sessionId }) => {
  const movies = useSelector(state => state.cashedMovies);
  const getCurrent = id => ({ _id }) => _id === id;
  const currentMovie = movies.filter(getCurrent(movieId))[0];

  const isFirstRoom = () => {
    const currentRoomTitle = cinemaRooms.find(getCurrent(roomId)).title;
    return currentRoomTitle.includes("1");
  };

  return (
    <>
      {
        currentMovie &&
        <div className="session-wrapper">
          <div className="session-wrapper__image">
            <Link to={ `/movies/id/${ movieId }` }>
              <img src={ currentMovie.movieInfo.image } alt={ currentMovie.movieInfo.title } />
            </Link>
            <div className="session-description-adaptive">
              <h2>{ currentMovie.movieInfo.title }</h2>
              <p className="session-description-adaptive__row">{ date }</p>
              <p className="session-description-adaptive__row">{ time }</p>
              <p className="session-description-adaptive__row">{ isFirstRoom ? "Зал 1" : "Зал 2" }</p>
              <Link to={ `/room/id/cinemaId=${ cinemaId }/roomId=${ roomId }/movieId=${ movieId }` }>
                <button>Купить билет</button>
              </Link>
            </div>
          </div>

          <div className="session-description">
            <h2>{ currentMovie.movieInfo.title }</h2>
            <p className="session-description__row">{ date }</p>
            <p className="session-description__row">{ time }</p>
            <p className="session-description__row">{ isFirstRoom ? "Зал 1" : "Зал 2" }</p>
            <Link to={ `/room/id/cinemaId=${ cinemaId }/roomId=${ roomId }/movieId=${ movieId }/sessionId=${ sessionId }` }>
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
  sessionId: PropTypes.string,
  cinemaRooms: PropTypes.array
};
