import RoomToolTip from "./RoomToolTip";
import sofa from "../../../assets/images/room/sofa.svg";
import sofa_selected from "../../../assets/images/room/sofa_selected.svg";
import sofa_occupied from "../../../assets/images/room/sofa_occupied.svg";
import armchairLux from "../../../assets/images/room/armchairLux.svg";
import armchairLux_selected from "../../../assets/images/room/armchairLux_selected.svg";
import armchairLux_occupied from "../../../assets/images/room/armchairLux_occupied.svg";
import armchair from "../../../assets/images/room/armchair.svg";
import armchair_selected from "../../../assets/images/room/armchair_selected.svg";
import armchair_occupied from "../../../assets/images/room/armchair_occupied.svg";
import { roomSeatTypes, furnitureItemTitle } from "../../../constants/constants";
import PropTypes from "prop-types";
import React, { useState } from "react";

const FurnitureItem = ({ cinemaId, sessionId, currentSeat, row, price, type, selectSeatHandler }) => {
  const { isOccupied, isSelected, place } = currentSeat;
  const [isTooltipVisible, setIsToolTipVisible] = useState(false);
  const [isSeatSelected, setIsSeatSelected] = useState(isSelected);

  const updatedSeat = {
    cinemaId,
    sessionId,
    rowNumber: row,
    type,
    price,
    seatNumber: place,
    isSelected: !isSeatSelected,
    isOccupied: false
  };

  const selectHandler = () => {
    setIsSeatSelected(!isSeatSelected);
    selectSeatHandler(updatedSeat);
  };

  const furnitureItem = new Map()
    .set((!isSelected && !isOccupied && roomSeatTypes.sofa), sofa)
    .set((!isSelected && !isOccupied && roomSeatTypes.armchair), armchair)
    .set((!isSelected && !isOccupied && roomSeatTypes.armchairLux), armchairLux)
    .set((isSelected && !isOccupied && roomSeatTypes.sofa), sofa_selected)
    .set((isSelected && !isOccupied && roomSeatTypes.armchair), armchair_selected)
    .set((isSelected && !isOccupied && roomSeatTypes.armchairLux), armchairLux_selected)
    .set((isOccupied && roomSeatTypes.sofa), sofa_occupied)
    .set((isOccupied && roomSeatTypes.armchair), armchair_occupied)
    .set((isOccupied && roomSeatTypes.armchairLux), armchairLux_occupied);

  return (
    <>
      {
        isTooltipVisible &&
        <RoomToolTip seatData={ [{
          type: furnitureItemTitle.get(type),
          place,
          row,
          price
        }] } />
      }
      <img
        className={ `furniture__sofa ${ isOccupied ? "disabled" : "" }` }
        src={ furnitureItem.get(type) }
        alt={ furnitureItem.get(type) }
        width="100%"
        onMouseEnter={ () => setIsToolTipVisible(true) }
        onMouseLeave={ () => setIsToolTipVisible(false) }
        onClick={ () => !isOccupied && selectHandler() }
      />
    </>
  );
};

export default FurnitureItem;

FurnitureItem.propTypes = {
  cinemaId: PropTypes.string,
  sessionId: PropTypes.string,
  currentSeat: PropTypes.object,
  row: PropTypes.number,
  price: PropTypes.number,
  type: PropTypes.string,
  selectSeatHandler: PropTypes.func
};
