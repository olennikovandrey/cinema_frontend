import reloadImg from "../../../assets/images/room/reload.svg";
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const SocketModal = ({ socketMsg, setIsSocketModalOpen, isSocketModalOpen, getRoom }) => {
  const { cinemaId, roomId, movieId } = useParams();

  const handleClick = () => {
    getRoom(cinemaId, roomId, movieId);
    setIsSocketModalOpen(false);
  };

  return (
    <div className={ `socket-modal ${ isSocketModalOpen ? "visible" : "hidden" }` }>
      <p>{ socketMsg }</p>
      <img src={ reloadImg } alt="reload" onClick={ handleClick }/>
    </div>
  );
};

export default SocketModal;

SocketModal.propTypes = {
  socketMsg: PropTypes.string,
  isSocketModalOpen: PropTypes.bool,
  getRoom: PropTypes.func,
  setIsSocketModalOpen: PropTypes.func
};
