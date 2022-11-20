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

const FurnitureItem = ({ roomId, currentSeat, row, price, type, selectSeatHandler }) => {
  const { isOccupied, isSelected, place } = currentSeat;
  const [isTooltipVisible, setIsToolTipVisible] = useState(false);
  const [isSeatSelected, setIsSeatSelected] = useState(isSelected);

  const updatedSeat = {
    roomId: roomId,
    rowNumber: row,
    type: type,
    price: price,
    seatNumber: place,
    isSelected: !isSeatSelected,
    isOccupied: false
  };

  const selectHandler = () => {
    setIsSeatSelected(!isSeatSelected);
    selectSeatHandler(updatedSeat);
  };

  const furnitureItem = new Map()
    .set((!isSeatSelected && !isOccupied && roomSeatTypes.sofa), sofa)
    .set((!isSeatSelected && !isOccupied && roomSeatTypes.armchair), armchair)
    .set((!isSeatSelected && !isOccupied && roomSeatTypes.armchairLux), armchairLux)
    .set((isSeatSelected && !isOccupied && roomSeatTypes.sofa), sofa_selected)
    .set((isSeatSelected && !isOccupied && roomSeatTypes.armchair), armchair_selected)
    .set((isSeatSelected && !isOccupied && roomSeatTypes.armchairLux), armchairLux_selected)
    .set((isOccupied && roomSeatTypes.sofa), sofa_occupied)
    .set((isOccupied && roomSeatTypes.armchair), armchair_occupied)
    .set((isOccupied && roomSeatTypes.armchairLux), armchairLux_occupied);

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
  roomId: PropTypes.string,
  currentSeat: PropTypes.object,
  row: PropTypes.number,
  price: PropTypes.number,
  type: PropTypes.string,
  selectSeatHandler: PropTypes.func
};
