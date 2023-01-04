import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const GoBack = ({ scrollValueToChange = 20, additionalFn = null}) => {
  const homeLink = useRef(null);
  const navigate = useNavigate();
  const prevPage = -1;

  const goBack = () => {
    navigate(prevPage);
    additionalFn && additionalFn();
  };

  useEffect(() => {
    const backgroundChanger = () => {
      const scroll = document.documentElement.scrollTop;

      if (scroll > scrollValueToChange) {
        homeLink.current.style.background = "#000";
        homeLink.current.style.top = "0";
      } else {
        homeLink.current.style.background = "#000000b9";
        homeLink.current.style.top = "10px";
      }
    };

    window.addEventListener("scroll", backgroundChanger);
    return () => {
      window.removeEventListener("scroll", backgroundChanger);
    };
  }, [scrollValueToChange]);

  return (
    <>
      <div className="go-back-link" ref={ homeLink }>
        <Link to="/" className="go-home"></Link>
        <span onClick={ goBack }>Назад</span>
      </div>
    </>
  );
};

export default GoBack;

GoBack.propTypes = {
  scrollValueToChange: PropTypes.string,
  backSteps: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  additionalFn: PropTypes.func
};
