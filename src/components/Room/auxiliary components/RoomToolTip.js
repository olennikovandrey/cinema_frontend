import PropTypes from "prop-types";
import React from "react";

const RoomToolTip = ({ seatData }) => {
  return (
    <>
      { seatData.map(({ row, place, type, price}) =>
        <div className="room-tooltip" key={ row + place }>
          <div className="position">
            <p>{ row } ряд</p>
            <p className="position__place">{ place }</p>
            <p>место</p>
          </div>
          <div className="description">
            <p>{ type }</p>
            <p>{ price } BYN</p>
          </div>
        </div>
      ) }
    </>
  );
};

export default RoomToolTip;

RoomToolTip.propTypes = {
  seatData: PropTypes.array
};
