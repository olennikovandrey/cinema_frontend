/* eslint-disable react-hooks/exhaustive-deps */
import { deleteSessionFetch } from "./deleteSession.api";
import { getSessionsForDeleteSession } from "../sessions.services";
import { getAllCinemasFetch } from "../../../adminSettings.api";
import Select from "../../Select";
import Modal from "../../../../Modal/Modal";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

const DeleteSession = () => {
  const [cinemas, setCinemas] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const movies = useSelector(state => state.movies);

  const setCinemaHandler = cinemaId => {
    setSelectedCinemaId(cinemaId);
    const sessions = getSessionsForDeleteSession(cinemas, cinemaId, movies);
    setSessions(sessions);
  };

  const deleteSessionHandler = async (_id, selectedCinemaId) => {
    const { message, cinemas } = await deleteSessionFetch(_id, selectedCinemaId);
    const sessions = getSessionsForDeleteSession(cinemas, selectedCinemaId, movies);
    setSessions(sessions);
    setResponseMessage(message);
    setCinemas(cinemas);
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function getAllCinemas() {
      const { allCinemas } = await getAllCinemasFetch();
      setCinemas(allCinemas);
      setSelectedCinemaId(allCinemas[0]._id);

      const sessions = getSessionsForDeleteSession(allCinemas, allCinemas[0]._id, movies);
      setSessions(sessions);
    }
    getAllCinemas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="delete-session-wrapper">
      { cinemas &&
        <Select
          label="Выберите кинотеатр из списка"
          required={ false }
          optionValues={ cinemas }
          stateFunc={ e => setCinemaHandler(e.target.value.trim()) }
          width="50%"
        />
      }
      { selectedCinemaId && sessions &&
      <div className="delete-items-wrapper">
        {
          sessions.map(({ _id, title }) =>
            <React.Fragment key={ _id }>
              <div className="delete-item">
                <span className="delete-item__row">{ title }</span>
                <span className="delete-item__icon" onClick={ () => deleteSessionHandler(_id, selectedCinemaId) }></span>
              </div>
            </React.Fragment>
          )
        }
      </div>
      }
      {
        <Modal message={ responseMessage } success={ responseMessage === "Киносеанс успешно удален" } isModal={ isModalOpen } />
      }
    </div>
  );
};

export default DeleteSession;
