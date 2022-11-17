import React, { useState } from "react";
import PropTypes from "prop-types";

const ActorFields = ({ setActorsToMainForm }) => {
  const [actorData, setActorData] = useState({ actor: {
    name: "",
    link: "",
    image: ""
  }});
  const [isActorAdded, setIsActorAdded] = useState(false);

  const addActor = () => {
    setActorsToMainForm(actorData);
    setIsActorAdded(true);
  };

  return (
    <div className="inputs-group">
      <div className="admin-item__input inputs-group__input">
        <label>Имя, фамилия актера <b>*</b></label>
        <input type="text" onChange={ e => setActorData({ ...actorData, name: e.target.value }) } />
      </div>
      <div className="admin-item__input inputs-group__input">
        <label>Ссылка на страницу актера</label>
        <input type="text" onChange={ e => setActorData({ ...actorData, link: e.target.value }) } />
      </div>
      <div className="admin-item__input inputs-group__input">
        <label>Ссылка на фотографию актера</label>
        <input type="text" onChange={ e => setActorData({ ...actorData, image: e.target.value }) } />
      </div>
      { !isActorAdded && actorData.name && <span className="admin-item__confirm" onClick={ () => addActor()}></span> }
    </div>
  );
};

export default ActorFields;

ActorFields.propTypes = {
  setActorsToMainForm: PropTypes.func
};
