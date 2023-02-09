import Session from "./Session";
import { addCinemaFetch } from "./addCinema.api";
import Input from "../../Input";
import { handleBlur } from "../../../adminSettings.services";
import Modal from "../../../../Modal/Modal";
import { CHECK_IS_LOADER_OPEN } from "../../../../../store/actions/action-types";
import Loader from "../../../../Loader/Loader";
import addCinemaSchema from "../../../../../validation/adminPanel/addCinemaSchema.json";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ajv from "ajv";

const AddCinema = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cinemaData, setCinemaData] = useState({
    title: "", sessions: []
  });
  const isLoaderOpen = useSelector(state => state.isLoaderOpen);
  const dispatch = useDispatch();
  const sessionsAmount = 6;

  const setSessions = session => {
    setCinemaData({ ...cinemaData, sessions: [ ...cinemaData.sessions, session ] });
  };

  const addCinemaHandler = async cinemaData => {
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: true });
    const { message } = await addCinemaFetch(cinemaData);
    setResponseMessage(message);
    dispatch({ type: CHECK_IS_LOADER_OPEN, payload: false });
    setIsModalOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    document.querySelectorAll("[data-valid]").forEach(item => item.classList.remove("invalid"));
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(addCinemaSchema);

    if (validate(cinemaData)) {
      addCinemaHandler(cinemaData);
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
    <div className="add-cinema-wrapper">
      <form className="add-cinema-form" onSubmit={ e => handleSubmit(e) }>
        <Input
          inputConfigs={ [{
            label: "Название кинотеатра",
            onBlur: e => handleBlur(e, setCinemaData, "title" ),
            valid: ".title"
          }] }
        />
        <div className="session-wrapper">
          {
            Array.from({ length: sessionsAmount }, (_, index) =>
              <Session
                key={ index }
                setSessionToMainForm={ setSessions }
                index={ index }
              />
            )
          }
        </div>
        <button type="submit" className="admin-settings-button">Добавить</button>
        <Modal message={ responseMessage } success={ responseMessage === "Кинотеатр успешно добавлен" } isModal={ isModalOpen } />
        { isLoaderOpen && <Loader /> }
      </form>
    </div>
  );
};

export default AddCinema;
