/* eslint-disable react-hooks/exhaustive-deps */
import { addSessionFetch } from "./addSession.api";
import { getCinemaRooms } from "./addSession.services";
import Input from "../../Input";
import { handleBlur, handleChange, sortedMovies } from "../../../adminSettings.services";
import { getCinemasRoom } from "../../../adminSettings.constants";
import Modal from "../../../../Modal/Modal";
import { getAllCinemasFetch, getAllMoviesFetch } from "../../../adminSettings.api";
import Select from "../../Select";
import React, { useState, useEffect } from "react";

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
    addSessionHandler(session);
  };

  useEffect(() => {
    async function getAllCinemas() {
      const { allCinemas } = await getAllCinemasFetch();
      const movies = await getAllMoviesFetch();
      const sorted = sortedMovies(movies);
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
    }
    getAllCinemas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="add-session-wrapper">
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
            optionValues={ sortedMovies(movies).map(({ movieInfo }) => movieInfo) }
            stateFunc={ e => handleChange(e, setSession, "movieId") }
            width={ screenWidth < 426 ? "100%" : "50%" }
          />
          <Input
            inputConfigs={ [{
              label: "Дата",
              placeholder: "27 декабря 2022 г.",
              onBlur: e => handleBlur(e, setSession, "date")
            },
            {
              label: "Время",
              placeholder: "14.15",
              onBlur: e => handleBlur(e, setSession, "time")
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
