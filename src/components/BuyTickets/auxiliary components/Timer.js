import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ timerValue }) => {
  const [timeLeft, setTimeLeft] = useState(timerValue);
  const getPadTime = time => time.toString().padStart(2, "0");
  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft => Math.max(timeLeft - 1, 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="timer">
      <span>{ minutes }:{ seconds } на покупку билета</span>
    </div>
  );
};

export default Timer;

Timer.propTypes = {
  timerValue: PropTypes.number
};
