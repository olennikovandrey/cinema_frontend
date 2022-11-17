import { updateCinemaFetch, getAllCInemasFetch, getAllRoomsFetch } from "./updateCinema.api";
import Select from "../../Select";
import EditableInput from "../../EditableInput";
import { handleBlurForEditableInputsGroup, handleBlurForEditableInput } from "../../../adminSettings.services";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const UpdateCinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [sessionData, setSessionData] = useState([{
    date: "", time: "", movieId: "", roomId: ""
  }]);
  const [updatedCinema, setUpdatedCinema] = useState({});
  const movies = useSelector(state => state.movies);

  const changeSessionSelectValues = ({ target }) => {
    const { value, name } = target;
    setSessionData({
      ...sessionData,
      [name]: value
    });
  };

  useEffect(() => {
    async function getAllCinemas() {
      const { allCinemas } = await getAllCInemasFetch();
      const { rooms } = await getAllRoomsFetch();
      setCinemas(allCinemas);
      setRooms(rooms);
      setSelectedCinemaId(allCinemas[0]._id);
    }
    getAllCinemas();
  }, []);

  const calculateLength = (cinemas, selectedCinema) => {
    const cinemaId = cinemas.findIndex(({ _id }) => _id === selectedCinema);
    return cinemas[cinemaId].sessions.length;
  };

  const selectedCinemas = useMemo(() => {
    return cinemas.filter(({ _id }) => _id === selectedCinemaId);
  }, [cinemas, selectedCinemaId]);

  return (
    <div className="update-cinema-wrapper">
      { cinemas &&
        <Select
          label="Выберите кинотеатр из списка"
          required={ false }
          optionValues={ cinemas }
          stateFunc={ e => setSelectedCinemaId(e.target.value) }
          width="30%"
        />
      }
      { selectedCinemaId && cinemas &&
        <form className="update-cinema-form">
          <EditableInput
            inputConfigs={ [{
              label: "Название кинотеатра",
              required: false,
              value: selectedCinemas[0].title,
              name: "title",
              onBlur: e => handleBlurForEditableInput( e, setUpdatedCinema, "title")
            }] }
          />
          <div className="session-wrapper">
            { Array.from({ length: calculateLength(cinemas, selectedCinemaId) }, (_, index) =>
              <div className="session-wrapper__session" key={ index }>
                <p>Киносеанс:</p>
                <Select
                  label="Выберите кинозал"
                  required={ false }
                  optionValues={ rooms }
                  defaultValue={ selectedCinemas[0].sessions[index].roomId }
                  stateFunc={ e => changeSessionSelectValues(e) }
                  name="roomId"
                />
                <EditableInput
                  inputConfigs={ [{
                    label: "Дата",
                    required: false,
                    value: selectedCinemas[0].sessions[index].date,
                    onBlur: e => handleBlurForEditableInputsGroup( e, setSessionData, ["session", "date"] )
                  },
                  {
                    label: "Время",
                    required: false,
                    value: selectedCinemas[0].sessions[index].time,
                    onBlur: e => handleBlurForEditableInputsGroup( e, setSessionData, ["session", "time"] )
                  }] }
                />
                <Select
                  label="Выберите фильм"
                  required={ false }
                  optionValues={ movies }
                  defaultValue={ selectedCinemas[0].sessions[index].movieId }
                  stateFunc={ e => changeSessionSelectValues(e) }
                  name="movieId"
                />
              </div>
            )}
          </div>
        </form>
      }
    </div>
  );
};

export default UpdateCinema;
