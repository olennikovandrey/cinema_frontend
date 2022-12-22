import { totalOccupiedSeats, totalSeats } from "../../services/services";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const SessionInfo = ({ movie, sessionItem }) => {
  const { title, sessions, _id } = sessionItem;
  const { date, time, roomId, movieId } = sessions;
  const occupiedPersent = totalOccupiedSeats(sessions) / totalSeats(sessions) * 100;
  const isFull = occupiedPersent === 100;

  const sessionDate = date => {
    return date.split(" ")[0];
  };

  return (
    <div className="session">
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
          <button className={ isFull ? "button-pink not-active" : "button-pink" }>{ isFull ? "Мест нет" : "Купить билет" }</button>
        </Link>
      </div>
      <div className="progress">
        <div className="progress__line" style={ { width: `${ 100 - occupiedPersent }%` } }></div>
      </div>
    </div>
  );
};

export default SessionInfo;

SessionInfo.propTypes = {
  movie: PropTypes.object,
  sessionItem: PropTypes.object
};
