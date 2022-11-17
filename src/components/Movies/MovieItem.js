import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ movie }) => {
  const { _id, image, title, age, rating } = movie;

  return (
    <Link to={ `/movies/id/${ _id }` }>
      <div className="movie-item__image">
        <img src={ image } alt={ title } />
        { age && <span className="age">{ age }</span> }
        { rating && <span className="rating">{ rating }</span> }
      </div>
      <span className="movie-item__title">{ title }</span>
    </Link>
  );
};

export default MovieItem;

MovieItem.propTypes = {
  movie: PropTypes.object
};
