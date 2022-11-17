import ActorFields from "./ActorFields";
import { addMovieFetch } from "./addMovie.api";
import { handleBlur, handleBlurForSeveralValues, handleBlurForInputsGroup } from "../../../adminSettings.services";
import Input from "../../Input";
import Textarea from "../../Textarea.js";
import Modal from "../../../../Modal/Modal";
import React, { useState, useEffect } from "react";

const AddMovie = () => {
  const [movie, setMovie] = useState({ producer: { name: "", link: "" }, actors: [] } );
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setActors = actor => {
    setMovie({ ...movie, actors: [ ...movie.actors, actor ] });
  };

  const addMovieHandler = async movie => {
    const { message } = await addMovieFetch(movie);
    setResponseMessage(message);
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addMovieHandler(movie);
  };

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="add-movie-wrapper">
      <form className="add-movie-form" onSubmit={ e => handleSubmit(e)}>
        <Input
          inputConfigs={ [{
            label: "Название фильма",
            onBlur: e => handleBlur(e, setMovie, "title")
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Страна производства",
            onBlur: e => handleBlurForSeveralValues(e, setMovie, "country"),
            placeholder: "Россия, США"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Год выпуска",
            onBlur: e => handleBlur(e, setMovie,  "year")
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Жанр",
            onBlur: e => handleBlurForSeveralValues(e, setMovie, "genre"),
            placeholder: "комедия, боевик"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Слоган",
            onBlur: e => handleBlur(e, setMovie, "slogan")
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Режиссер",
            onBlur: e => handleBlurForInputsGroup(e, setMovie, ["producer", "name"])
          }, {
            label: "Ссылка на страницу режиссера",
            onBlur: e => handleBlurForInputsGroup(e, setMovie, ["producer", "link"]),
            required: false
          }] }
        />
        <Textarea
          label="Описание"
          onBlur={ e => setMovie({ ...movie, description: e.target.value }) }
        />
        <Input
          inputConfigs={ [{
            label: "Длительность",
            onBlur: e => handleBlur(e, setMovie, "duration"),
            placeholder: "148 минут / 02:28"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Возраст",
            onBlur: e => handleBlur(e, setMovie, "age"),
            placeholder: "16+",
            required: false
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Райтинг",
            onBlur: e => handleBlur(e, setMovie, "rating"),
            placeholder: "8.0"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Ссылка на обложку фильма",
            onBlur: e => handleBlur(e, setMovie, "image")
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Кадр из фильма",
            onBlur: e => handleBlur(e, setMovie, "crop")
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "iframe на Youtube трейлер",
            onBlur: e => handleBlur(e, setMovie, "youtubeIframe")
          }] }
        />
        {
          Array.from({ length: 10 }, (_, index) =>
            <ActorFields setActorsToMainForm={ setActors } key={ index } />)
        }
        <button type="submit" className="admin-settings-button">Добавить</button>
        {
          <Modal message={ responseMessage } success={ responseMessage === "Фильм успешно добавлен" } isModal={ isModalOpen } />
        }
      </form>
    </div>
  );
};

export default AddMovie;
