import MovieInfo from "./auxiliary components/MovieInfo";
import GoBack from "../GoBack/GoBack";
import { totalOccupiedSeats, totalSeats } from "../../services/services";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SelectCinema = () => {
  const location = useLocation();
  const { movie } = location.state;
  const { movieInfo, cinemas } = movie;

  return (
    <section className="select-cinema">
      <div className="crop" style={ { background: `url(${ movieInfo.crop }) 40% 25%` } }></div>
      <GoBack />
      <MovieInfo movie={ movie }/>
      <div className="select-cinema__sessions">
        {
          cinemas.map(({ session, title, _id }) => {
            const occupiedPercent = totalOccupiedSeats(session) / totalSeats(session) * 100;
            const isFull = occupiedPercent === 100;

            return (
              <Link to={ `/room/id/cinemaId=${ _id }/roomId=${ session.roomId }/movieId=${ session.movieId }` } key={ session._id }>
                <div className={ !isFull ? "select-cinema__sessions-item" : "select-cinema__sessions-item-disabled" }>
                  <h3 className="select-cinema__sessions-item-title">{ title }</h3>
                  <p>{ session.date }</p>
                  <p>{ !isFull ? session.time : "Свободных мест нет" }</p>
                  <div className="progress">
                    <div className="progress__line" style={ { width: `${ 100 - occupiedPercent }%` } }></div>
                  </div>
                </div>
              </Link>
            );
          })
        }
      </div>
    </section>
  );
};

export default SelectCinema;
