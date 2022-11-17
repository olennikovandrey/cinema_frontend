import { deleteMovieFetch, getAllMoviesFetch } from "./deleteMovie.api";
import { SET_MOVIES } from "../../../../../store/actions/action-types";
import Modal from "../../../../Modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteMovie = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch();

  const deleteMovie = async title => {
    const { message, movies } = await deleteMovieFetch(title);
    setResponseMessage(message);
    dispatch({ type: SET_MOVIES, payload: movies });
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function getMovies() {
      const movies = await getAllMoviesFetch();
      dispatch({ type: SET_MOVIES, payload: movies });
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
          movies
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map(({ _id, image, title,  }) =>
              <div className="delete-item" style={ { height: "100px", flexDirection: "row", alignItems: "center" } } key={ _id }>
                <img src={ image } alt={ `${ title } cover` }/>
                <span className="delete-item__row">{ title }</span>
                <span className="delete-item__icon" onClick={ () => deleteMovie(title) }></span>
              </div>
            )
        }
      </div>
      {
        <Modal message={ responseMessage } success={ responseMessage === "Фильм успешно удален" } isModal={ isModalOpen } />
      }
    </div>
  );
};

export default DeleteMovie;
