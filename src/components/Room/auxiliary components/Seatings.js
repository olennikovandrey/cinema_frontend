import FurnitureItem from "./FurnitureItem";
import { roomLegend } from "../../../constants/constants";
import PropTypes from "prop-types";
import React from "react";

const LegendItem = () => {
  return (
    <div className="legend">
      {
        roomLegend.map(({ image, value, alt }) =>
          <React.Fragment key={ value }>
            <img src={ image } alt={ alt } />
            <span>{ value }</span>
          </React.Fragment>
        )
      }
    </div>
  );
};

const Seatings = ({ room, selectSeatHandler }) => {
  return (
    <>
      <div className="seatings">
        <span className="seatings__screen"></span>
        <span className="seatings__screen-title" name={ room.cinemaTitle }>Экран</span>
        {
          room.rows.map(row =>
            <div className="seatings__row" key={ row._id }>
              <span className="row-number">{ row.number }</span>
              { row.seats.map(seat =>
                <div className="furniture" key={ seat._id }>
                  <FurnitureItem
                    roomId={ room._id }
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
    </>
  );
};

export default Seatings;

Seatings.propTypes = {
  room: PropTypes.object,
  selectSeatHandler: PropTypes.func
};
