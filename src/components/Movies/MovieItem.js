import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  const { _id, image, title, age, rating } = movie.movieInfo;
  const firstSessionDate = movie => { return movie.cinemas[0].session.date; };
  const firstSessionTime = movie => { return movie.cinemas[0].session.time; };
  const date = firstSessionDate(movie);
  const time = firstSessionTime(movie);
  const newDate = date => { return [date.split(" ")[0], date.split(" ")[1]].join(" "); };

  return (
    <Link to={ `/movies/id/${ _id }` }>
      <div className="movie-item__image">
        <img src={ image } alt={ title } />
        { age && <span className="age">{ age }</span> }
        { rating && <span className="rating">{ rating }</span> }
        {
          movie.cinemas.length === 1 ? movie.cinemas.map(item => {
            const { date, time, roomId, movieId } = item.session;
            return (
              <div className="movie-item__sessions" key={ item._id }>
                <Link to={ `/room/id/cinemaId=${ item._id }/roomId=${ roomId }/movieId=${ movieId }` }>
                  <button className="button-pink">{ date } { time }</button>
                </Link>
              </div>
            );
          }) :
            <div className="movie-item__sessions">
              {
                <>
                  <Link to={ `/room/id/cinemaId=${ movie.cinemas[0]._id }/roomId=${ movie.cinemas[0].session.roomId }/movieId=${ movie.cinemas[0].session.movieId }` }>
                    <button className="button-pink some-buttons">{ newDate(date) } { time }</button>
                  </Link>
                  <Link to="/selectcinema" state={ { movie: movie } }>
                    <button className="button-pink some-buttons" style={{ fontSize: "2em" }}>...</button>
                  </Link>
                </>
              }

            </div>
        }
      </div>
      <span className="movie-item__title">{ title }</span>
    </Link>
  );
};

export default MovieItem;

MovieItem.propTypes = {
  movie: PropTypes.object
};
