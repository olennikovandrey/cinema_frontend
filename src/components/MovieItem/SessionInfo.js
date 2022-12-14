import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const SessionInfo = ({ movie, sessionItem }) => {
  const { title, sessions, _id } = sessionItem;
  const { date, time, roomId, movieId } = sessions;

  const sessionDate = (date) => {
    return date.split(" ")[0];
  };

  return (
    <div className="session-info">
      <div className="session-info__description">
        <div className="description-room">
          <p className="description-room-title">г. Минск, { title }</p>
        </div>
        <div className="description-date" data-date={ sessionDate(date) }>
          <p className="description-date-title">{ date } { time }<span>{ movie.age }</span></p>
        </div>
      </div>
      <Link to={ `/room/id/cinemaId=${ _id }/roomId=${ roomId }/movieId=${ movieId }` }>
        <button className="button-pink">Купить билет</button>
      </Link>
    </div>
  );
};

export default SessionInfo;

SessionInfo.propTypes = {
  movie: PropTypes.object,
  sessionItem: PropTypes.object
};
