import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const GoBack = ({ scrollValueToChange = 20, backValue = "Назад", backSteps = -1, additionalFn = null}) => {
  const homeLink = useRef(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(backSteps);
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
        <span onClick={ goBack }>{ backValue }</span>
      </div>
    </>
  );
};

export default GoBack;

GoBack.propTypes = {
  scrollValueToChange: PropTypes.string,
  backValue: PropTypes.string,
  backSteps: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  additionalFn: PropTypes.func
};
