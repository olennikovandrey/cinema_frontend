/* eslint-disable react-hooks/exhaustive-deps */
import { addSessionFetch } from "./addSession.api";
import { getCinemaRooms } from "./addSession.services";
import Input from "../../Input";
import { handleBlur, handleChange, setCorrectDate, sortMovies } from "../../../adminSettings.services";
import { getCinemasRoom } from "../../../adminSettings.constants";
import Modal from "../../../../Modal/Modal";
import { getAllCinemasFetch, getAllMoviesFetch } from "../../../adminSettings.api";
import Select from "../../Select";
import addSessionSchema from "../../../../../validation/adminPanel/addSessionSchema.json";
import { CHECK_IS_LOADER_OPEN } from "../../../../../store/actions/action-types";
import Loader from "../../../../Loader/Loader";
import React, { useState, useEffect } from "react";
import Ajv from "ajv";
import { useDispatch, useSelector } from "react-redux";

const AddSession = () => {
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [session, setSession] = useState({
    cinemaId: "", roomId: "", movieId: "", date: "", time: "", rows: []
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const dispatch = useDispatch();
  const screenWidth = window.innerWidth;

  const setCinemaHandler = e => {
    const currentCinemaId = e.target.value.split(" ")[0].trim();
    const currentCinemasFirstRoomId = cinemas.find(({ _id }) => _id === currentCinemaId).rooms[0]._id;
    setSelectedCinemaId(currentCinemaId);
    setSession({ ...session, cinemaId: currentCinemaId, roomId: currentCinemasFirstRoomId });
  };

  const setRoomsSelect = e => {
    const roomId = e.target.value.trim();
    setSession({ ...session, roomId: roomId, rows: getCinemasRoom(roomId) });
  };

  const addSessionHandler = async sessionData => {
    const { message } = await addSessionFetch(sessionData);
    setResponseMessage(message);
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    document.querySelectorAll("input[data-valid]").forEach(item => item.classList.remove("invalid"));
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(addSessionSchema);

    if (validate(session)) {
      addSessionHandler(session);
    } else {
      setResponseMessage("Проверьте правильность введенных Вами данных");
      setIsModalOpen(true);
      validate.errors.forEach(({ dataPath }) => document.querySelector(`[data-valid="${ dataPath }"]`).classList.add("invalid"));
    }
  };

  useEffect(() => {
    async function getAllCinemas() {
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
      const { allCinemas } = await getAllCinemasFetch();
      const movies = await getAllMoviesFetch();
      const sorted = sortMovies(movies);
      const firstCinemaId = allCinemas[0]._id;
      const firstRoomId = allCinemas[0].rooms[0]._id;
      const firstMovieId = sorted[0].movieInfo._id;

      setCinemas(allCinemas);
      setMovies(sorted);
      setSelectedCinemaId(firstCinemaId);
      setSession({
        ...session,
        cinemaId: firstCinemaId,
        movieId: firstMovieId,
        roomId: firstRoomId,
        rows: getCinemasRoom(firstRoomId)
      });
      setIsLoaded(true);
      dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
    }
    getAllCinemas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="add-session-wrapper">
      { isLoaderOpen && <Loader /> }
      { isLoaded &&
        <form className="add-session-form" onSubmit={ e => handleSubmit(e) }>
          <Select
            label="Выберите кинотеатр"
            optionValues={ cinemas }
            stateFunc={ e => setCinemaHandler(e) }
            width={ screenWidth < 426 ? "100%" : "50%" }
          />
          <Select
            label="Выберите кинозал"
            optionValues={ getCinemaRooms(cinemas, selectedCinemaId) }
            stateFunc={ e => setRoomsSelect(e) }
            width={ screenWidth < 426 ? "100%" : "50%" }
          />
          <Select
            label="Выберите фильм"
            optionValues={ sortMovies(movies).map(({ movieInfo }) => movieInfo) }
            stateFunc={ e => handleChange(e, setSession, "movieId") }
            width={ screenWidth < 426 ? "100%" : "50%" }
          />
          <Input
            inputConfigs={ [{
              label: "Дата",
              inputType: "date",
              onBlur: e => setCorrectDate(e, setSession, "date"),
              valid: ".date"
            },
            {
              label: "Время",
              placeholder: "14.15",
              onBlur: e => handleBlur(e, setSession, "time"),
              valid: ".time"
            }
            ] }
          />
          <button type="submit" className="admin-settings-button">Добавить</button>
          {
            <Modal message={ responseMessage } success={ responseMessage === "Киносеанс успешно добавлен" } isModal={ isModalOpen } />
          }
        </form>
      }
    </div>
  );
};

export default AddSession;
