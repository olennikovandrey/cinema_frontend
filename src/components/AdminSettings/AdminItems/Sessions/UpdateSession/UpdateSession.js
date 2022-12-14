/* eslint-disable react-hooks/exhaustive-deps */
import { updateSessionFetch } from "./updateSession.api";
import { getSessionsForUpdateSession } from "../sessions.services";
import { getAllCinemasFetch } from "../../../adminSettings.api";
import Select from "../../Select";
import Input from "../../Input";
import { setCorrectDateForInputGroups, handleBlurForInputsGroup, handlerChangeForSelect, handleChange, handlerChangeForSecondValue } from "../../../adminSettings.services";
import { getCinemasRoom } from "../../../adminSettings.constants";
import Modal from "../../../../Modal/Modal";
import { VegasFilmRoom } from "../../../../../constants/VegasFilm.room";
import updateSessionSchema from "../../../../../validation/adminPanel/updateSessionSchema.json";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Ajv from "ajv";

const UpdateSession = () => {
  const [cinemas, setCinemas] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [updatedSession, setUpdatedSession] = useState({
    cinemaId: "",
    sessionId: "",
    session: { date: "", time: "", movieId: "", roomId: "", rows: VegasFilmRoom }
  });
  const movies = useSelector(state => state.movies);

  const setSessionHandler = e => {
    handleChange(e, setUpdatedSession, "sessionId");
    handlerChangeForSecondValue(e, setUpdatedSession, ["session", "roomId"]);
  };

  const setCinemaHandler = e => {
    const currentCinemaId = e.target.value.split(" ")[0].trim();
    const currentSessions = cinemas.find(item => item._id === currentCinemaId).sessions;
    const currentSessionsRoomId = currentSessions[0].roomId;
    const cinemaRoom = getCinemasRoom(currentSessionsRoomId);
    const sessions = currentSessions.map(({ _id, movieId, date, time, roomId }) => (
      { _id: _id,
        title: `${ movies.find(item => item._id === movieId).movieInfo.title } / ${ date } / ${ time }`,
        secondValue: roomId
      }
    ));

    setSessions(sessions);
    setUpdatedSession({
      ...updatedSession,
      cinemaId: currentCinemaId,
      session: { ...updatedSession.session, rows: cinemaRoom, roomId: currentSessionsRoomId } });
  };

  const updateSessionHandler = async () => {
    const { message, cinemas } = await updateSessionFetch(updatedSession);
    setResponseMessage(message);
    setCinemas(cinemas);
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(updateSessionSchema);

    if (validate(updatedSession)) {
      updateSessionHandler();
    } else {
      setResponseMessage("?????????????????? ???????????????????????? ?????????????????? ???????? ????????????");
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    async function getAllCinemas() {
      const { allCinemas } = await getAllCinemasFetch();
      setCinemas(allCinemas);
      setSelectedCinemaId(allCinemas[0]._id);
      setUpdatedSession({
        ...updatedSession,
        cinemaId: allCinemas[0]._id,
        sessionId: allCinemas[0].sessions[0]._id,
        session: {
          ...updatedSession.session,
          movieId: movies[0]._id,
          roomId: allCinemas[0].sessions[0].roomId
        }
      });

      const sessions = getSessionsForUpdateSession(allCinemas, movies);
      setSessions(sessions);
    }
    getAllCinemas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="update-session-wrapper">
      { cinemas &&
        <Select
          label="???????????????? ?????????????????? ???? ????????????"
          required={ false }
          optionValues={ cinemas }
          stateFunc={ e => setCinemaHandler(e) }
          width="50%"
        />
      }
      { selectedCinemaId && sessions &&
        <>
          <Select
            label="???????????????? ??????????????????"
            required={ false }
            optionValues={ sessions }
            stateFunc={ e => setSessionHandler(e) }
            width="50%"
          />
          <form className="update-session-form" onSubmit={ e => handleSubmit(e) }>
            <div className="session-wrapper">
              <div className="session-wrapper__session">
                <p>???????????????? ????:</p>
                <Input
                  inputConfigs={ [{
                    label: "????????",
                    inputType: "date",
                    onBlur: e => setCorrectDateForInputGroups(e, setUpdatedSession, ["session", "date"])
                  },
                  {
                    label: "??????????",
                    onBlur: e => handleBlurForInputsGroup( e, setUpdatedSession, ["session", "time"] )
                  }] }
                />
                <Select
                  label="???????????????? ??????????"
                  required={ false }
                  optionValues={ movies.map(item => item.movieInfo) }
                  defaultValue={ "" }
                  stateFunc={ e => handlerChangeForSelect(e, setUpdatedSession, ["session", "movieId"]) }
                  name="movieId"
                />
              </div>
            </div>
            <button type="submit" className="admin-settings-button">????????????????</button>
            {
              <Modal message={ responseMessage } success={ responseMessage === "?????????????????? ?????????????? ????????????????" } isModal={ isModalOpen } />
            }
          </form>
        </>
      }
    </div>
  );
};

export default UpdateSession;
