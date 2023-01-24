import MovieItemIntoCinema from "./MovieItemIntoCinema";
import { moviesIntoCinemaSwiperSettings } from "../../constants/constants";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

const CinemaMain = ({ mainImage }) => {
  const cinemas = useSelector(state => state.cinemas);
  const currentCinema = useSelector(state => state.currentCinema);
  const currentCinemaData = cinemas.filter(({ title }) => title === currentCinema)[0];

  return (
    <>
      <div className="cinema-item__image" style={ { background: `url(${ mainImage }) no-repeat` } } />
      <div className="cinema-item__sessions">
        {
          <Swiper { ...moviesIntoCinemaSwiperSettings }>
            {
              currentCinemaData && currentCinemaData.sessions.map(({ _id, date, time, movieId, roomId }) =>
                <SwiperSlide key={ _id }>
                  <MovieItemIntoCinema
                    sessionId={ _id }
                    cinemaId={ currentCinemaData._id }
                    date={ date }
                    time={ time }
                    movieId={ movieId }
                    roomId={ roomId }
                    cinemaRooms={ currentCinemaData.rooms }
                  />
                </SwiperSlide>
              )
            }
          </Swiper>
        }
      </div>
    </>
  );
};

export default CinemaMain;

CinemaMain.propTypes = {
  mainImage: PropTypes.string
};
