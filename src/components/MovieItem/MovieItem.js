/* eslint-disable react-hooks/exhaustive-deps */
import Actor from "./Actor";
import { getExactMovieFetch } from "./movieItem.api";
import { createMarkup } from "../../services/services";
import { CHECK_IS_LOADER_OPEN } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import GoBack from "../GoBack/GoBack";
import { baseUrl } from "../../constants/constants";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MovieItem = () => {
  const [movie, setMovie] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const getMovieData = async (id) => {
    const url = `${ baseUrl }/movies/id/id=${ id }`;
    const movieData = await getExactMovieFetch(url);
    setMovie(movieData);
  };

  useEffect(() => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    getMovieData(id);
    setIsLoaded(true);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  }, [id, dispatch]);

  return (
    <>
      { !isLoaded && <Loader /> }
      { isLoaded && !!movie &&
      <section className="movie">
        <div className="crop" style={ { background: `url(${ movie.crop }) 40% 25%` } }></div>
        <GoBack scrollValueToChange="390" />
        <div className="description">
          <div className="description__image">
            <img src={ movie.image } alt={ movie.title } />
          </div>
          <div className="description__title-container">
            <h1 className="description__title">{ movie.title } </h1>
            <p className="description__age"> { movie.age }</p>
          </div>
          <span className="description__row"><b>Жанр:</b> { movie.genre.join(", ") }</span>
          <span className="description__row"><b>Страна производства:</b> { movie.country.join(", ") }</span>
          <span className="description__row"><b>Год выпуска:</b> { movie.year }</span>
          <span className="description__row"><b>Слоган:</b> { movie.slogan }</span>
          <span className="description__row"><b>Длительность:</b> { movie.duration }</span>
          <span className="description__row"><b>Рейтинг:</b> { movie.rating }</span>
          <span className="description__row"><b>Продюссер:</b>
            <a href={ movie.producer[0].link }> { movie.producer[0].name }</a></span>
          <span className="description__content"><b>Описание:</b> { movie.description }</span>
          <div className="trailer-actors">
            <div
              className="trailer-actors__trailer"
              dangerouslySetInnerHTML={ createMarkup(movie.youtubeIframe) }>
            </div>
            <div className="trailer-actors__actors">
              <p>В главных ролях:</p>
              {
                movie.actors.map(item =>
                  <Actor key={ item.name } actor={ item } />
                )
              }
            </div>
          </div>
        </div>
      </section>
      }
    </>
  );
};

export default MovieItem;
