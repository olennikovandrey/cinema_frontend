/* eslint-disable react-hooks/exhaustive-deps */
import { updateMovieFetch, getAllMoviesFetch } from "./updateMovie.api";
import { getExactMovieInfo } from "./services";
import { CHECK_IS_LOADER_OPEN } from "../../../../../store/actions/action-types";
import { sortMovies } from "../../../adminSettings.services";
import { handleChangeForEditableSeveralValues, handleBlurForEditableInput, handleBlurForEditableInputsGroup } from "../../../adminSettings.services";
import EditableInput from "../../EditableInput";
import EditableTextarea from "../../EditableTextarea";
import Modal from "../../../../Modal/Modal";
import Loader from "../../../../Loader/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [changedMovie, setChangedMovie] = useState();
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const dispatch = useDispatch();

  const movieDataSetter = (moviesData, searchTitle) => {
    const currentMovie = moviesData.find(({ movieTitle }) => movieTitle === searchTitle);
    const movieInfo = currentMovie.movieInfo;
    const { title, country, year, genre, slogan, producer, description, duration, age, rating, actors, image, youtubeIframe, crop } = movieInfo;
    setSelectedMovie(searchTitle);
    setChangedMovie({ ...changedMovie,
      title, country, year, genre, slogan, producer, description, duration, age, rating, actors, image, youtubeIframe, crop
    });
  };

  const getMovies = async () =>  {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    const moviesData = await getAllMoviesFetch();
    const firstMovieTitle = sortMovies(moviesData)[0].movieTitle;
    setMovies(moviesData);
    movieDataSetter(moviesData, firstMovieTitle);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
  };

  const handlerSubmit = async e => {
    e.preventDefault();
    const { message, movies } = await updateMovieFetch(changedMovie);
    setMovies(movies);
    setResponseMessage(message);
    setIsModalOpen(true);
  };

  const onSelectHandler = e => {
    const currentMovieTitle = e.target.value;
    movieDataSetter(movies, currentMovieTitle);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="update-movie-wrapper">
      { isLoaderOpen && <Loader /> }
      <h3>Выберите фильм из списка</h3>
      <select onChange={ e => onSelectHandler(e)}>
        {
          sortMovies(movies)
            .map(({ movieInfo }) => {
              const { title } = movieInfo;
              return <option key={ title } value={ title }>{ title }</option>;
            })
        }
      </select>
      {
        getExactMovieInfo(movies, selectedMovie)
          .map(({ movieInfo }) => {
            const { _id, country, year, genre, slogan, producer, description, duration, age, rating, image, crop, youtubeIframe } = movieInfo;
            const countryStr = country.join(", ");
            const genreStr = genre.join(", ");
            const { name, link } = producer[0];
            return (
              <form key={ _id } className="update-movie-form" onSubmit={ e => handlerSubmit(e) }>
                <EditableInput
                  inputConfigs={ [{
                    label: "Страна производства",
                    value: countryStr,
                    onBlur: e => handleChangeForEditableSeveralValues(e, setChangedMovie, "country") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Год выпуска",
                    value: year,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "year") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Жанр",
                    value: genreStr,
                    onBlur: e => handleChangeForEditableSeveralValues(e, setChangedMovie, "genre") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Слоган",
                    value: slogan,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "slogan") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Режиссер",
                    value: name,
                    onBlur: e => handleBlurForEditableInputsGroup(e, setChangedMovie, ["producer", "name"]) },
                  {
                    label: "Ссылка на страницу режиссера",
                    value: link,
                    onBlur: e => handleBlurForEditableInputsGroup(e, setChangedMovie, ["producer", "link"])
                  }] }
                />
                <EditableTextarea
                  textareaConfigs={ [{
                    label: "Описание",
                    value: description,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "description") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Длительность",
                    value: duration,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "duration") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Возраст",
                    value: age,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "age") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Рейтинг",
                    value: rating,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "rating") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Обложка фильма (изображение)",
                    value: image,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "image") }] }
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Кадр из фильма (изображение)",
                    value: crop,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "crop") }] }
                />
                <EditableTextarea
                  textareaConfigs={ [{
                    label: "iframe на Youtube трейлер",
                    value: youtubeIframe,
                    onBlur: e => handleBlurForEditableInput(e, setChangedMovie, "youtubeIframe") }] }
                />
                <button type="submit" className="admin-settings-button">Обновить</button>
                {
                  <Modal message={ responseMessage } success={ responseMessage === "Информация о фильме успешно обновлена" } isModal={ isModalOpen } />
                }
              </form>
            );
          })
      }
    </div>
  );
};

export default UpdateMovie;
