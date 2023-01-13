import MovieInfo from "./auxiliary components/MovieInfo";
import { getSessions } from "./selectCinemas.services";
import GoBack from "../GoBack/GoBack";
import { totalOccupiedSeats, totalSeats } from "../../services/services";
import { selectCinemasSwiperSettings } from "../../constants/constants";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

const SelectCinema = () => {
  const location = useLocation();
  const { movie } = location.state;
  const { movieInfo, cinemas } = movie;
  const sessions = getSessions(cinemas);
  const getSessionItem = ({ isFull, item, occupiedPercent }) => {
    return (
      <>
        <div className={ !isFull ? "session__item" : "session__item-disabled" }>
          <p>{ item.date }</p>
          <p>{ isFull ? "Свободных мест нет" : item.time }</p>
          <div className="progress">
            <div className="progress__line" style={ { width: `${ 100 - occupiedPercent }%` } }></div>
          </div>
        </div>
      </>
    );
  };

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
              <div className="sessions-wrapper">
                {
                  sessions.length > 4 ?
                    <Swiper { ...selectCinemasSwiperSettings }>
                      {
                        sessions.map(item => {
                          const occupiedPercent = totalOccupiedSeats(item) / totalSeats(item) * 100;
                          const isFull = occupiedPercent === 100;

                          return (
                            <SwiperSlide key={ item._id + item.roomId}>
                              {
                                isFull ? getSessionItem({ isFull, item, occupiedPercent }) :
                                  <Link to={ `/room/id/cinemaId=${ _id }/roomId=${ item.roomId }/movieId=${ item.movieId }` }>
                                    { getSessionItem({ isFull, item, occupiedPercent }) }
                                  </Link>
                              }
                            </SwiperSlide>
                          );
                        })
                      }
                    </Swiper> :

                    sessions.map(item => {
                      const occupiedPercent = totalOccupiedSeats(item) / totalSeats(item) * 100;
                      const isFull = occupiedPercent === 100;

                      return (
                        <>
                          {
                            isFull ? getSessionItem({ isFull, item, occupiedPercent }) :
                              <Link  className="single-link" to={ `/room/id/cinemaId=${ _id }/roomId=${ item.roomId }/movieId=${ item.movieId }` }>
                                { getSessionItem({ isFull, item, occupiedPercent }) }
                              </Link>
                          }
                        </>
                      );
                    })
                }
              </div>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default SelectCinema;
