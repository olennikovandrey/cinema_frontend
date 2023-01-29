import FurnitureItem from "./FurnitureItem";
import { roomLegend } from "../../../constants/constants";
import PropTypes from "prop-types";
import React from "react";

const LegendItem = () => {
  return (
    <div className="legend">
      {
        roomLegend.map(({ image, value, alt }) =>
          <div className="legend__item" key={ value }>
            <img src={ image } alt={ alt } />
            <span>{ value }</span>
          </div>
        )
      }
    </div>
  );
};

const Seatings = ({ cinemaTitle, cinemaId, sessionId, rows, selectSeatHandler }) => {
  return (
    <div className="seatings">
      <span className="seatings__screen"></span>
      <span className="seatings__screen-title" name={ cinemaTitle }>Экран</span>
      {
        rows.map(row =>
          <div className="seatings__row" key={ row._id }>
            <span className="row-number">{ row.number }</span>
            { row.seats.map(seat =>
              <div className="furniture" key={ seat._id }>
                <FurnitureItem
                  cinemaId={ cinemaId }
                  sessionId={ sessionId }
                  currentSeat={ seat }
                  row={ row.number }
                  price={ row.price }
                  type={ row.seatType }
                  selectSeatHandler={ selectSeatHandler }
                />
              </div>
            ) }
          </div>
        )
      }
      <LegendItem />
    </div>
  );
};

export default Seatings;

Seatings.propTypes = {
  cinemaTitle: PropTypes.string,
  sessionId: PropTypes.string,
  cinemaId: PropTypes.string,
  rows: PropTypes.array,
  selectSeatHandler: PropTypes.func
};
