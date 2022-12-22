import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const MovieInfo = ({ movie }) => {
  const { movieInfo } = movie;
  const { _id, image, title, duration, country } = movieInfo;

  return (
    <div className="movie-info">
      <Link to={ `/movies/id/${ _id }` }>
        <img className="movie-info__image" src={ image } alt={ title } />
      </Link>
      <div className="movie-info__description">
        <h1 className="description-movie-title">{ title }</h1>
        <p>{ country.join(", ") }</p>
        <p>{ duration }</p>
      </div>
    </div>
  );
};

export default MovieInfo;

MovieInfo.propTypes = {
  movie: PropTypes.object
};
