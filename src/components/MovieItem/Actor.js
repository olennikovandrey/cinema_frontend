import React, { useState } from "react";
import PropTypes from "prop-types";

const Actor = ({ actor }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { name, link, image } = actor;

  const ActorModal = () => {
    return (
      <div className={ isModalVisible ? "actor-modal visible" : "actor-modal hidden" }>
        <img src={ image } alt={ name }/>
      </div>
    );
  };

  return (
    <>
      <span
        key={ name }
        className="actor"
      >
        <a href={ link } target="blank">{ name }</a>
        <span
          className="actor__photo-icon"
          onMouseEnter={ () => setModalVisible(true) }
          onMouseLeave={ () => setModalVisible(false) }
        ></span>
        <ActorModal />
      </span>
    </>
  );
};

export default Actor;

Actor.propTypes = {
  actor: PropTypes.object
};
