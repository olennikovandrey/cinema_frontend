import MovieInfo from "./auxiliary components/MovieInfo";
import { getSessions } from "./selectCinemas.services";
import GoBack from "../GoBack/GoBack";
import { totalOccupiedSeats, totalSeats } from "../../services/services";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SelectCinema = () => {
  const location = useLocation();
  const { movie } = location.state;
  const { movieInfo, cinemas } = movie;
  const sessions = getSessions(cinemas);

  return (
    <section className="select-cinema">
      <div className="crop" style={ { background: `url(${ movieInfo.crop }) 40% 25%` } }></div>
      <GoBack />
      <MovieInfo movie={ movie }/>
      <div className="select-cinema__sessions">
        {
          sessions.map(({ sessions, title, _id }) =>
            <div className="session" key={ _id }>
              <h3 className="session__title">{ title }</h3>
              {
                sessions.map(item => {
                  const occupiedPercent = totalOccupiedSeats(item) / totalSeats(item) * 100;
                  const isFull = occupiedPercent === 100;
                  return (
                    <Link to={ `/room/id/cinemaId=${ _id }/roomId=${ item.roomId }/movieId=${ item.movieId }` } key={ item._id }>
                      <div className={ !isFull ? "session__item" : "session__item-disabled" }>
                        <p>{ item.date }</p>
                        <p>{ !isFull ? item.time : "Свободных мест нет" }</p>
                        <div className="progress">
                          <div className="progress__line" style={ { width: `${ 100 - occupiedPercent }%` } }></div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              }
            </div>
          )
        }
      </div>
    </section>
  );
};

export default SelectCinema;
