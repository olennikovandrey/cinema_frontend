import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HomeLink = ({ scrollValueToChange = 20 }) => {
  const homeLink = useRef(null);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

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
      <div className="home-link" ref={ homeLink }>
        <span onClick={ goBack }>Назад</span>
      </div>
    </>
  );
};

export default HomeLink;

HomeLink.propTypes = {
  scrollValueToChange: PropTypes.string
};
