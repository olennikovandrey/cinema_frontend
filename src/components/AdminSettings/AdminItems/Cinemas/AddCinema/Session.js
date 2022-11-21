/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import Select from "../../Select";
import Input from "../../Input";
import { doFetch } from "../../../../../services/services";
import { urls } from "../../../../../constants/constants";
import { MovieHDRoom } from "../../../../../constants/MovieHD.room";
import { VegasFilmRoom } from "../../../../../constants/VegasFilm.room";
import { WorldScreen } from "../../../../../constants/WorldScreen.room";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Session = ({ setSessionToMainForm }) => {
  const movies = useSelector(state => state.movies);
  const [isSessionAdded, setIsSessionAdded] = useState(false);
  const [rooms, setRooms] = useState();
  const [sessionData, setSessionData] = useState({
    date: "", time: "", movieId: "", roomId: "", rows: []
  });

  const cinemas = Object.freeze({
    MovieHD: ["637b97a6c4bcbb60ee489b67", "637bdeee0e36ceb230dac4b6"],
    VegasFilm: ["637be3ae2fc1c3c2b6ae82ff" , "637be3bc2fc1c3c2b6ae8364"],
    WorldScreen: ["637be648c9562ba5feda44ea", "637be64cc9562ba5feda4569"]
  });

  const getCinemasRoom = new Map()
    .set(cinemas.MovieHD[0], MovieHDRoom)
    .set(cinemas.MovieHD[1], MovieHDRoom)
    .set(cinemas.VegasFilm[0], VegasFilmRoom)
    .set(cinemas.VegasFilm[1], VegasFilmRoom)
    .set(cinemas.WorldScreen[0], WorldScreen)
    .set(cinemas.WorldScreen[1], WorldScreen);

  const setMoviesSelect = movieId => {
    setSessionData({ ...sessionData, movieId: movieId });
  };

  const setRoomsSelect = roomId => {
    setSessionData({ ...sessionData, roomId: roomId, rows: getCinemasRoom.get(roomId) });
  };

  const addSession = () => {
    setSessionToMainForm(sessionData);
    setIsSessionAdded(true);
  };

  useEffect(() => {
    async function getRooms() {
      const rooms = await doFetch(urls.getAllRooms);
      setRooms(rooms.rooms);
      setSessionData({ ...sessionData, movieId: movies[0]._id, roomId: rooms.rooms[0]._id });
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
              onBlur: e => setSessionData({ ...sessionData, date: e.target.value })
            },
            {
              label: "Время",
              onBlur: e => setSessionData({ ...sessionData, time: e.target.value })
            }
            ] }
          />
          <Select
            label="Выберите фильм"
            optionValues={ movies }
            stateFunc={ e => setMoviesSelect(e.target.value) }
            width="95%"
          />
          { !isSessionAdded && sessionData.date && sessionData.time &&
          <span className="admin-item__confirm session-confirm" onClick={ () => addSession() }></span>
          }
        </div>
      }
    </>
  );
};

export default Session;

Session.propTypes = {
  setSessionToMainForm: PropTypes.func
};
