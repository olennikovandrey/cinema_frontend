import ActorFields from "./ActorFields";
import { addMovieFetch } from "./addMovie.api";
import { handleBlur, handleBlurForSeveralValues, handleBlurForInputsGroup } from "../../../adminSettings.services";
import Input from "../../Input";
import Textarea from "../../Textarea.js";
import Modal from "../../../../Modal/Modal";
import addMovieSchema from "../../../../../validation/adminPanel/addMovieSchema.json";
import React, { useState, useEffect } from "react";
import Ajv from "ajv";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    country: [],
    year: "",
    genre: "",
    slogan: "",
    producer: { name: "", link: "" },
    description: "",
    duration: "",
    age: "",
    rating: "",
    image: "",
    crop: "",
    youtubeIframe: "",
    actors: [] } );
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
    document.querySelectorAll("[data-valid]").forEach(item => item.classList.remove("invalid"));
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(addMovieSchema);

    if (validate(movie)) {
      addMovieHandler(movie);
    } else {
      setResponseMessage("Проверьте правильность введенных Вами данных");
      setIsModalOpen(true);
      validate.errors.forEach(({ dataPath }) => document.querySelectorAll(`[data-valid="${ dataPath }"]`).forEach(item => item.classList.add("invalid")));
    }
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
            onBlur: e => handleBlur(e, setMovie, "title"),
            valid: ".title"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Страна производства",
            onBlur: e => handleBlurForSeveralValues(e, setMovie, "country"),
            placeholder: "Россия, США",
            valid: ".country"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Год выпуска",
            onBlur: e => handleBlur(e, setMovie,  "year"),
            valid: ".year"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Жанр",
            onBlur: e => handleBlurForSeveralValues(e, setMovie, "genre"),
            placeholder: "комедия, боевик",
            valid: ".genre"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Слоган",
            onBlur: e => handleBlur(e, setMovie, "slogan"),
            valid: ".slogan"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Режиссер",
            onBlur: e => handleBlurForInputsGroup(e, setMovie, ["producer", "name"]),
            valid: ".producer.name"
          }, {
            label: "Ссылка на страницу режиссера",
            onBlur: e => handleBlurForInputsGroup(e, setMovie, ["producer", "link"]),
            required: false,
            valid: ".producer.link"
          }] }
        />
        <Textarea
          label="Описание"
          onBlur={ e => setMovie({ ...movie, description: e.target.value }) }
          valid=".description"
        />
        <Input
          inputConfigs={ [{
            label: "Длительность",
            onBlur: e => handleBlur(e, setMovie, "duration"),
            placeholder: "148 минут / 02:28",
            valid: ".duration"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Возраст",
            onBlur: e => handleBlur(e, setMovie, "age"),
            placeholder: "16+",
            valid: ".age"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Райтинг",
            onBlur: e => handleBlur(e, setMovie, "rating"),
            placeholder: "8.0",
            valid: ".rating"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Ссылка на обложку фильма",
            onBlur: e => handleBlur(e, setMovie, "image"),
            valid: ".image"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "Кадр из фильма",
            onBlur: e => handleBlur(e, setMovie, "crop"),
            valid: ".crop"
          }] }
        />
        <Input
          inputConfigs={ [{
            label: "iframe на Youtube трейлер",
            onBlur: e => handleBlur(e, setMovie, "youtubeIframe"),
            valid: ".youtubeIframe"
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
