import React from "react";
import PropTypes from "prop-types";

const SocketModal = ({ isInfoModalOpen = false }) => {
  const message = "Текущая информация о наличии свободных мест обновляется автоматически. Одно место может быть забронировано не более чем на пять минут";

  return (
    <div className={ `socket-modal ${ isInfoModalOpen ? "visible" : "hidden" }` }>
      <p>{ message }</p>
    </div>
  );
};

export default SocketModal;

SocketModal.propTypes = {
  isInfoModalOpen: PropTypes.bool
};
