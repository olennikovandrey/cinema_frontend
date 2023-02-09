import { deleteMovieFetch } from "./deleteMovie.api";
import { getAllMoviesFetch } from "../../../adminSettings.api";
import { SET_MOVIES, CHECK_IS_LOADER_OPEN } from "../../../../../store/actions/action-types";
import Modal from "../../../../Modal/Modal";
import { sortMovies } from "../../../adminSettings.services";
import Loader from "../../../../Loader/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteMovie = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const movies = useSelector(state => state.movies);
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const dispatch = useDispatch();

  const deleteMovie = async title => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    const { message, movies } = await deleteMovieFetch(title);
    setResponseMessage(message);
    dispatch({ type: SET_MOVIES, payload: movies });
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function getMovies() {
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
      const movies = await getAllMoviesFetch();
      dispatch({ type: SET_MOVIES, payload: movies });
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
    }
    getMovies();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="delete-movie-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск по названию"
        onChange={ e => setSearchValue(e.target.value) }
      />
      <div className="delete-items-wrapper" >
        {
          sortMovies(movies)
            .filter(({ movieInfo }) => movieInfo.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map(item => {
              const { movieInfo } = item;
              const { _id, image, title }  = movieInfo;

              return (
                <div className="delete-item" style={ { height: "100px", flexDirection: "row", alignItems: "center" } } key={ _id }>
                  <img src={ image } alt={ `${ title } cover` }/>
                  <span className="delete-item__row">{ title }</span>
                  <span className="delete-item__icon" onClick={ () => deleteMovie(title) }></span>
                </div>
              );
            })
        }
      </div>
      <Modal message={ responseMessage } success={ responseMessage === "Фильм успешно удален" } isModal={ isModalOpen } />
      { isLoaderOpen && <Loader /> }
    </div>
  );
};

export default DeleteMovie;
