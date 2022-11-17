/* eslint-disable react-hooks/exhaustive-deps */
import { deleteCinemaFetch, getAllCInemasFetch } from "./deleteCinema.api";
import Modal from "../../../../Modal/Modal";
import { debounce } from "../../../../../services/services";
import React, { useState, useEffect, useCallback } from "react";

const DeleteCinema = () => {
  const [cinemasData, setCinemasData] = useState();
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debauncedSetSearchValue = useCallback(debounce(setSearchValue), []);

  const handleClick = async title => {
    const { message, allCinemas } = await deleteCinemaFetch(title);
    setResponseMessage(message);
    setCinemasData(allCinemas);
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function getCinemas() {
      const { allCinemas } = await getAllCInemasFetch();
      setCinemasData(allCinemas);
    }
    getCinemas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <>
      { cinemasData &&
      <div className="delete-cinema-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Поиск по названию"
          onChange={ e => debauncedSetSearchValue(e.target.value.trim()) }
        />
        <div className="delete-items-wrapper">
          {
            cinemasData
              .filter(({ title }) => title.toLowerCase().includes(searchValue.toLowerCase()))
              .map(({ title }) =>
                <div className="delete-item" key={ title }>
                  <span className="delete-item__row">{ title }</span>
                  <span className="delete-item__icon" onClick={ () => handleClick(title) }></span>
                </div>
              )
          }
        </div>
        {
          <Modal message={ responseMessage } success={ responseMessage === "Кинотеатр успешно удален" } isModal={ isModalOpen } />
        }
      </div>
      }
    </>
  );
};

export default DeleteCinema;
