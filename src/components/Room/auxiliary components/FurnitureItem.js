import RoomToolTip from "./RoomToolTip";
import sofa from "../../../assets/images/room/sofa.svg";
import sofa_occupied from "../../../assets/images/room/sofa_occupied.svg";
import armchairLux from "../../../assets/images/room/armchairLux.svg";
import armchair from "../../../assets/images/room/armchair.svg";
import PropTypes from "prop-types";
import React, { useState } from "react";

const FurnitureItem = ({ currentSeat, row, price, type }) => {
  const [isTooltipVisible, setIsToolTipVisible] = useState(false);
  const { isOccupied, isSelected, place } = currentSeat;

  const roomSeatTypes = Object.freeze({
    sofa: "sofa",
    armchair: "armchair",
    armchairLux: "armchairLux"
  });

  const furnitureItem = new Map()
    .set(roomSeatTypes.sofa, sofa)
    .set(roomSeatTypes.armchair, armchair)
    .set(roomSeatTypes.armchairLux, armchairLux);

  const furnitureItemTitle = new Map()
    .set(roomSeatTypes.sofa, "Sofa")
    .set(roomSeatTypes.armchair, "Armchair")
    .set(roomSeatTypes.armchairLux, "Armchair Lux");

  return (
    <>
      {
        isTooltipVisible &&
        <RoomToolTip seatData={ [{
          type: furnitureItemTitle.get(type),
          place: place,
          row: row,
          price: price
        }] }
        />
      }
      <img
        className="furniture__sofa"
        src={ furnitureItem.get(type) }
        alt={ furnitureItem.get(type) }
        width="100%"
        onMouseEnter={ () => setIsToolTipVisible(true) }
        onMouseLeave={ () => setIsToolTipVisible(false) }
      />
    </>
  );
};

export default FurnitureItem;

FurnitureItem.propTypes = {
  currentSeat: PropTypes.object,
  row: PropTypes.number,
  price: PropTypes.number,
  type: PropTypes.string
};
