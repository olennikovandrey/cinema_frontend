import reloadImg from "../../../assets/images/room/reload.svg";
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const SocketModal = ({ socketMsg, isSocketModalOpen, getRoom }) => {
  const { cinemaId, roomId, movieId } = useParams();

  return (
    <div className={ `socket-modal ${ isSocketModalOpen ? "visible" : "hidden" }` }>
      <p>{ socketMsg }</p>
      <img src={ reloadImg } alt="reload" onClick={() => getRoom(cinemaId, roomId, movieId)}/>
    </div>
  );
};

export default SocketModal;

SocketModal.propTypes = {
  socketMsg: PropTypes.string,
  isSocketModalOpen: PropTypes.bool,
  getRoom: PropTypes.func
};
