/* eslint-disable react-hooks/exhaustive-deps */
import { updateCinemaFetch, getAllCinemasFetch } from "./updateCinema.api";
import Select from "../../Select";
import EditableInput from "../../EditableInput";
import { handleBlurForEditableInputsGroup, handlerChangeForSelect, handleChange, handlerChangeForSecondValue } from "../../../adminSettings.services";
import { getCinemasRoom } from "../../../adminSettings.constants";
import Modal from "../../../../Modal/Modal";
import { VegasFilmRoom } from "../../../../../constants/VegasFilm.room";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

const UpdateCinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [updatedCinema, setUpdatedCinema] = useState({
    cinemaId: "",
    sessionId: "",
    session: { date: "", time: "", movieId: "", roomId: "", rows: VegasFilmRoom }
  });
  const movies = useSelector(state => state.movies);

  const setSessionHandler = e => {
    handleChange(e, setUpdatedCinema, "sessionId");
    handlerChangeForSecondValue(e, setUpdatedCinema, ["session", "roomId"]);
  };

  const setCinemaHandler = e => {
    const currentCinemaId = e.target.value.split(" ")[0].trim();
    const currentSessions = cinemas.filter(item => item._id === currentCinemaId)[0].sessions;
    const currentSessionsRoomId = currentSessions[0].roomId;
    const cinemaRoom = getCinemasRoom.get(currentSessionsRoomId);
    const sessions = currentSessions.map(({ _id, movieId, date, time, roomId }) => (
      { _id: _id,
        title: `${ movies.filter(item => item._id === movieId)[0].title } / ${ date } / ${ time }`,
        secondValue: roomId
      }
    ));

    setSessions(sessions);
    setUpdatedCinema({
      ...updatedCinema,
      cinemaId: currentCinemaId,
      session: { ...updatedCinema.session, rows: cinemaRoom } });
  };

  const updateCinemaHandler = async () => {
    const { message, cinemas } = await updateCinemaFetch(updatedCinema);
    setResponseMessage(message);
    setCinemas(cinemas);
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateCinemaHandler();
  };

  useEffect(() => {
    async function getAllCinemas() {
      const { allCinemas } = await getAllCinemasFetch();
      setCinemas(allCinemas);
      setSelectedCinemaId(allCinemas[0]._id);
      setUpdatedCinema({
        ...updatedCinema,
        cinemaId: allCinemas[0]._id,
        sessionId: allCinemas[0].sessions[0]._id,
        session: {
          ...updatedCinema.session,
          movieId: movies[0]._id
        }
      });
    }
    getAllCinemas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="update-cinema-wrapper">
      { cinemas &&
        <Select
          label="Выберите кинотеатр из списка"
          required={ false }
          optionValues={ cinemas }
          stateFunc={ e => setCinemaHandler(e) }
          width="50%"
        />
      }
      { selectedCinemaId && sessions &&
        <>
          <Select
            label="Выберите киносеанс"
            required={ false }
            optionValues={ sessions }
            stateFunc={ e => setSessionHandler(e) }
            width="50%"
          />
          <form className="update-cinema-form" onSubmit={ e => handleSubmit(e) }>
            <div className="session-wrapper">
              <div className="session-wrapper__session">
                <p>Изменить на:</p>
                <EditableInput
                  inputConfigs={ [{
                    label: "Дата",
                    required: false,
                    value: "",
                    onBlur: e => handleBlurForEditableInputsGroup( e, setUpdatedCinema, ["session", "date"] )
                  },
                  {
                    label: "Время",
                    required: false,
                    value: "",
                    onBlur: e => handleBlurForEditableInputsGroup( e, setUpdatedCinema, ["session", "time"] )
                  }] }
                />
                <Select
                  label="Выберите фильм"
                  required={ false }
                  optionValues={ movies }
                  defaultValue={ "" }
                  stateFunc={ e => handlerChangeForSelect(e, setUpdatedCinema, ["session", "movieId"]) }
                  name="movieId"
                />
              </div>
            </div>
            <button type="submit" className="admin-settings-button">Обновить</button>
            {
              <Modal message={ responseMessage } success={ responseMessage === "Кинотеатр успешно обновлен" } isModal={ isModalOpen } />
            }
          </form>
        </>
      }
    </div>
  );
};

export default UpdateCinema;
