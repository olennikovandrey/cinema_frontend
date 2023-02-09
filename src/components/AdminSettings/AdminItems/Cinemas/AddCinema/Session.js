/* eslint-disable react-hooks/exhaustive-deps */
import Select from "../../Select";
import Input from "../../Input";
import { doFetch } from "../../../../../services/services";
import { urls } from "../../../../../constants/constants";
import { getCinemasRoom } from "../../../adminSettings.constants";
import { setCorrectDate, isValidChecker } from "../../../adminSettings.services";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Session = ({ setSessionToMainForm, index }) => {
  const movies = useSelector(state => state.movies);
  const [isSessionAdded, setIsSessionAdded] = useState(false);
  const [rooms, setRooms] = useState();
  const [session, setSession] = useState({
    date: "", time: "", movieId: "", roomId: "", rows: []
  });

  const setMoviesSelect = movieId => {
    setSession({ ...session, movieId: movieId });
  };

  const setRoomsSelect = roomId => {
    setSession({ ...session, roomId: roomId, rows: getCinemasRoom(roomId) });
  };

  const addSession = () => {
    setSessionToMainForm(session);
    setIsSessionAdded(true);
  };

  useEffect(() => {
    async function getRooms() {
      const rooms = await doFetch(urls.getAllRooms);
      setRooms(rooms.rooms);
      setSession({ ...session, movieId: movies[0]._id, roomId: rooms.rooms[0]._id });
    }
    getRooms();
  }, []);

  return (
    <>
      { rooms &&
        <div className="session-wrapper__session">
          <p>Киносеанс:</p>
          <Select
            label="Выберите кинозал"
            optionValues={ rooms }
            stateFunc={ e => setRoomsSelect(e.target.value) }
          />
          <Input
            inputConfigs={ [{
              label: "Дата",
              inputType: "date",
              onBlur: e => setCorrectDate(e, setSession, "date"),
              onChangeRegEx: "^[0-9]{4}-[0-9]{2}-[0-9]{2}",
              valid: `.sessions[${ index }].date`,
              isValidChecker
            },
            {
              label: "Время",
              onBlur: e => setSession({ ...session, time: e.target.value }),
              onChangeRegEx: "^[0-2]{1}[0-9]{1}\\.[0-5]{1}[0-9]{1}",
              valid: `.sessions[${ index }].time`,
              isValidChecker
            }
            ] }
          />
          <Select
            label="Выберите фильм"
            optionValues={ movies.map(({ movieInfo }) => movieInfo) }
            stateFunc={ e => setMoviesSelect(e.target.value) }
            width="95%"
          />
          { !isSessionAdded && session.date && session.time &&
          <span className="admin-item__confirm session-confirm" onClick={ addSession }></span>
          }
        </div>
      }
    </>
  );
};

export default Session;

Session.propTypes = {
  setSessionToMainForm: PropTypes.func,
  index: PropTypes.number
};
