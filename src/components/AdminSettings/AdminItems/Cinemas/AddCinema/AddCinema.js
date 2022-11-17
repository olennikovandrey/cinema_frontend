import Session from "./Session";
import { addCinemaFetch } from "./addCinema.api";
import Input from "../../Input";
import { handleBlur } from "../../../adminSettings.services";
import Modal from "../../../../Modal/Modal";
import React, { useState, useEffect } from "react";

const AddCinema = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cinemaData, setCinemaData] = useState({
    title: "", sessions: []
  });
  const sessionsAmount = 10;

  const setSessions = session => {
    setCinemaData({ ...cinemaData, sessions: [ ...cinemaData.sessions, session ] });
  };

  const addCinemaHandler = async cinemaData => {
    const { message } = await addCinemaFetch(cinemaData);
    setResponseMessage(message);
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addCinemaHandler(cinemaData);
  };

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="add-cinema-wrapper">
      <form className="add-cinema-form" onSubmit={ e => handleSubmit(e) }>
        <Input
          inputConfigs={ [{
            label: "Название кинотеатра",
            onBlur: e => handleBlur(e, setCinemaData, "title" )
          }] }
        />
        <div className="session-wrapper">
          {
            Array.from({ length: sessionsAmount }, (_, index) =>
              <Session
                key={ index }
                setSessionToMainForm={ setSessions }
              />
            )
          }
        </div>
        <button type="submit" className="admin-settings-button">Добавить</button>
        {
          <Modal message={ responseMessage } success={ responseMessage === "Кинотеатр успешно добавлен" } isModal={ isModalOpen } />
        }
      </form>
    </div>
  );
};

export default AddCinema;
