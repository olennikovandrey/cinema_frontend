/* eslint-disable react-hooks/exhaustive-deps */
import CinemaMainItem from "./CinemaMainItem";
import { getAllCInemasFetch } from "./cinemaMain.api";
import { SET_CINEMAS } from "../../store/actions/action-types";
import vegasCinemaImage from "../../assets/images/cinema/vegas.jpeg";
import worldScreenCinemaImage from "../../assets/images/cinema/worldScreen.jpg";
import movieHDImage from "../../assets/images/cinema/movieHD.jpg";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CinemaMain = () => {
  const cinemas = useSelector(state => state.cinemas);
  const currentCinema = useSelector(state => state.currentCinema);
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpen);
  const isRegisterModalOpen = useSelector(state => state.isRegisterModalOpen);
  const isSearchModalOpen = useSelector(state => state.isSearchModalOpen);
  const isProfileModalOpen = useSelector(state => state.isProfileModalOpen);
  const isBlur = isLoginModalOpen || isRegisterModalOpen || isSearchModalOpen || isProfileModalOpen;
  const dispatch = useDispatch();

  useEffect(() => {
    const getCinemas = async () => {
      const { allCinemas } = await getAllCInemasFetch();
      dispatch({ type: SET_CINEMAS, payload: allCinemas });
    };
    getCinemas();
  }, []);

  return (
    <>
      { cinemas &&
        <div className={ isBlur ? "cinema-main blur" : "cinema-main" } >
          <div className="cinema-item">
            { {
              "MovieHD": <CinemaMainItem mainImage={ movieHDImage }/>,
              "WorldScreen": <CinemaMainItem mainImage={ worldScreenCinemaImage }/>,
              "Vegas film": <CinemaMainItem mainImage={ vegasCinemaImage }/>
            }[currentCinema] }
          </div>
        </div>
      }
    </>
  );
};

export default CinemaMain;

CinemaMain.propTypes = {
  movie: PropTypes.object
};
