/* eslint-disable react-hooks/exhaustive-deps */
import ProfileEditableItem from "./ProfileEditableItem";
import ProfileInput from "./ProfileInput";
import { getMyDataFetch, updateUserFetch } from "./profile.api";
import { CHECK_IS_PROFILE_MODAL_OPEN, SET_USER_PERSONAL_DATA } from "../../store/actions/action-types";
import Modal from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [updatedUser, setUpdatedUser] = useState({ email: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isProfileModalOpen = useSelector(state => state.isProfileModalOpen);
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const handleSave = async e => {
    e.preventDefault();
    const { message } = await updateUserFetch(updatedUser);
    setResponseMessage(message);
    setIsModalOpen(true);
  };

  const handleBlurForEditable = ({ currentTarget }) => {
    const name = currentTarget.getAttribute("name");
    const { textContent } = currentTarget;
    setUpdatedUser({ ...updatedUser, [name]: textContent });
  };

  const handleBlur = ({ target }) => {
    const { name, value } = target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  useEffect(() => {
    const getPersonalData = async () => {
      const { user } = await getMyDataFetch();
      dispatch({ type: SET_USER_PERSONAL_DATA, payload: user });
      setUpdatedUser({ ...updatedUser, email: user.email });
    };
    getPersonalData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setIsModalOpen(false); }, 5000);
    return () => { clearTimeout(timer); };
  }, [isModalOpen]);

  return (
    <div className={ `profile ${ isProfileModalOpen ? "profile-visible" : "profile-hidden" }` }>
      <span className="profile__icon"></span>
      <h2>{ userData.email }</h2>
      <ProfileEditableItem
        label="Имя"
        markupValue={ userData.firstName }
        handleBlur={ handleBlurForEditable }
        name="firstName"
      />
      <ProfileEditableItem
        label="Фамилия"
        markupValue={ userData.lastName }
        handleBlur={ handleBlurForEditable }
        name="lastName"
      />
      <div className="profile__password">
        <h3>Сменить пароль</h3>
        <ProfileInput
          label="Старый пароль"
          handleBlur={ handleBlur }
          name="oldPassword"
        />
        <ProfileInput
          label="Новый пароль"
          handleBlur={ handleBlur }
          name="password"
        />
      </div>
      <button onClick={ e => handleSave(e)}>Сохранить</button>

      <span
        className="close-button"
        style={ { top: "20px", right: "20px" } }
        onClick={ () => dispatch( { type: CHECK_IS_PROFILE_MODAL_OPEN, payload: !isProfileModalOpen }) }
      ></span>
      {
        <Modal message={ responseMessage } success={ responseMessage === "Информация успешно обновлена" } isModal={ isModalOpen } />
      }
    </div>
  );
};

export default Profile;
