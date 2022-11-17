/* eslint-disable react-hooks/exhaustive-deps */
import { deleteUserFetch, getAllUsersFetch } from "./deleteUser.api";
import Modal from "../../../../Modal/Modal";
import { debounce } from "../../../../../services/services";
import { userRole } from "../../../../../constants/constants";
import React, { useEffect, useState, useCallback } from "react";

const DeleteUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debauncedSetSearchValue = useCallback(debounce(setSearchValue), []);

  const deleteUser = async email => {
    const { message, users } = await deleteUserFetch(email);
    setResponseMessage(message);
    setAllUsers(users);
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function getUsers() {
      try {
        const allUsers = await getAllUsersFetch();
        setAllUsers(allUsers);
      } catch (e) {
        setResponseMessage("Что-то не так...", e);
        setIsModalOpen(true);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className="delete-user-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск по email"
        onChange={ e => debauncedSetSearchValue(e.target.value.trim()) }
      />
      <div className="delete-items-wrapper">
        {
          allUsers
            .filter(({ email }) => email.toLowerCase().includes(searchValue.toLowerCase()))
            .map(({ _id, email, firstName, role }) =>
              <div className="delete-item" key={ _id }>
                <span className="delete-item__row"><b>email: </b>{ email }</span>
                <span className="delete-item__row"><b>Имя пользователя: </b>{ firstName }</span>
                <span className="delete-item__row"><b>Роль пользователя: </b>{ role === userRole.admin ? "администратор" : "пользователь"}</span>
                { role !== userRole.admin &&
                  <span className="delete-item__icon" onClick={ () => deleteUser(email) }></span>
                }
              </div>
            )
        }
      </div>
      {
        <Modal message={ responseMessage } success={ responseMessage === "Пользователь удален" } isModal={ isModalOpen } />
      }
    </div>
  );
};

export default DeleteUser;
