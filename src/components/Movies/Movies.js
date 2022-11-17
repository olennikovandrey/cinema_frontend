import MovieItem from "./MovieItem";
import { getAllMovieFetch } from "./movies.api";
import { SET_MOVIES, CHECK_IS_LOADER_OPEN, SET_CASHED_MOVIES } from "../../store/actions/action-types";
import { moviesSwiperSettings } from "../../constants/constants";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Autoplay, Navigation]);

const Movies = () => {
  const movies = useSelector(state => state.movies);
  const randomMovies = useSelector(state => state.randomMovies);
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpen);
  const isRegisterModalOpen = useSelector(state => state.isRegisterModalOpen);
  const isSearchModalOpen = useSelector(state => state.isSearchModalOpen);
  const isProfileModalOpen = useSelector(state => state.isProfileModalOpen);
  const [isLoaded, setIsLoaded] = useState(false);
  const screenWidth = document.documentElement.clientWidth;
  const isBlur = isLoginModalOpen || isRegisterModalOpen || isSearchModalOpen || isProfileModalOpen;
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllMovies() {
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
      const movies = await getAllMovieFetch();
      dispatch({ type: SET_MOVIES, payload: movies });
      dispatch({ type: SET_CASHED_MOVIES, payload: movies });
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
      setIsLoaded(true);
    }
    getAllMovies();
  }, [dispatch]);

  return (
    <>
      {
        movies.length === 0 && isLoaded &&
        <div className={ isBlur ? "no-matches blur" : "no-matches" }>
          <p>По Вашему запросу совпадений нет...</p>
          <p>Может подойдет что-то другое?</p>
          <div className="movies-wrapper">
            {
              randomMovies.map( movie =>
                <div className="movie-item" key={ movie._id }>
                  <MovieItem movie={ movie } />
                </div>
              )
            }
          </div>
        </div>
      }

      <div className={ isBlur ? "movies-wrapper blur" : "movies-wrapper" }>
        {
          movies.length <= 6 && screenWidth > 1024 ? movies.map(movie =>
            <div className="movie-item" key={ movie._id }>
              <MovieItem movie={ movie } />
            </div>
          ) :
            <Swiper { ...moviesSwiperSettings }>
              {
                movies.map(movie =>
                  <SwiperSlide key={ movie._id }>
                    <div className="movie-item">
                      <MovieItem movie={ movie } />
                    </div>
                  </SwiperSlide>
                )
              }
            </Swiper>
        }
      </div>
    </>
  );
};

export default Movies;
