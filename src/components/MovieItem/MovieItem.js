/* eslint-disable react-hooks/exhaustive-deps */
import Actor from "./Actor";
import { getExactMovieFetch } from "./movieItem.api";
import SessionInfo from "./SessionInfo";
import { createMarkup } from "../../services/services";
import { CHECK_IS_LOADER_OPEN } from "../../store/actions/action-types";
import Loader from "../Loader/Loader";
import GoBack from "../GoBack/GoBack";
import { baseUrl } from "../../constants/constants";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MovieItem = () => {
  const [movie, setMovie] = useState();
  const [movieInfo, setMovieInfo] = useState();
  const [sessions, setSessions] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const getMovieData = async (id) => {
    const url = `${ baseUrl }/movies/id/id=${ id }`;
    const { movie } = await getExactMovieFetch(url);
    const { movieInfo, cinemas} = movie[0];

    setMovie(movie[0]);
    setMovieInfo(movieInfo);
    setSessions(cinemas);
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
      { isLoaded && movie && sessions &&
      <section className="movie">
        <div className="crop" style={ { background: `url(${ movieInfo.crop }) 40% 25%` } }></div>
        <GoBack scrollValueToChange="390" />
        <div className="sessions-wrapper">
          { sessions.length > 3 ?
            <>
              { sessions.slice(0, 3).map(item =>
                <React.Fragment key={ item._id + item.session._id }>
                  <SessionInfo
                    movie={ movieInfo }
                    sessionItem={ item }
                  />
                </React.Fragment>
              ) }
              <Link to="/selectcinema" state={ { movie } } className="sessions-wrapper__more">
                <span>...</span>
              </Link>
            </> :
            sessions.map(item =>
              <React.Fragment key={ item._id + item.session._id }>
                <SessionInfo
                  movie={ movieInfo }
                  sessionItem={ item }
                />
              </React.Fragment>
            )
          }
        </div>
        <div className="description">
          <div className="description__image">
            <img src={ movieInfo.image } alt={ movieInfo.title } />
          </div>
          <div className="description__title-container">
            <h1 className="description__title">{ movieInfo.title } </h1>
            <p className="description__age"> { movieInfo.age }</p>
          </div>
          <span className="description__row"><b>????????:</b> { movieInfo.genre.join(", ") }</span>
          <span className="description__row"><b>???????????? ????????????????????????:</b> { movieInfo.country.join(", ") }</span>
          <span className="description__row"><b>?????? ??????????????:</b> { movieInfo.year }</span>
          <span className="description__row"><b>????????????:</b> { movieInfo.slogan }</span>
          <span className="description__row"><b>????????????????????????:</b> { movieInfo.duration }</span>
          <span className="description__row"><b>??????????????:</b> { movieInfo.rating }</span>
          <span className="description__row"><b>??????????????????:</b>
            <a href={ movieInfo.producer[0].link }> { movieInfo.producer[0].name }</a></span>
          <span className="description__content"><b>????????????????:</b> { movieInfo.description }</span>
          <div className="trailer-actors">
            <div
              className="trailer-actors__trailer"
              dangerouslySetInnerHTML={ createMarkup(movieInfo.youtubeIframe) }>
            </div>
            <div className="trailer-actors__actors">
              <p>?? ?????????????? ??????????:</p>
              {
                movieInfo.actors.map(item =>
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
