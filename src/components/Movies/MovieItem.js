import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  const { _id, image, title, age, rating } = movie.movieInfo;

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
                movie.cinemas.map(item => {
                  const { date, time, roomId, movieId } = item.session;
                  const newDate = [date.split(" ")[0], date.split(" ")[1]].join(" ");

                  return (
                    <Link to={ `/room/id/cinemaId=${ item._id }/roomId=${ roomId }/movieId=${ movieId }` } key={ date + time }>
                      <button className="button-pink some-buttons">{ newDate } { time }</button>
                    </Link>
                  );
                })
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
