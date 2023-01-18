import RoomToolTip from "./RoomToolTip";
import sofa from "../../../assets/images/room/sofa.svg";
import sofa_selected from "../../../assets/images/room/sofa_selected.svg";
import sofa_selected_by_another from "../../../assets/images/room/sofa_selected_by_another_user.svg";
import sofa_occupied from "../../../assets/images/room/sofa_occupied.svg";
import armchairLux from "../../../assets/images/room/armchairLux.svg";
import armchairLux_selected from "../../../assets/images/room/armchairLux_selected.svg";
import armchairLux_selected_by_another from "../../../assets/images/room/armchairLux_selected_by_another_user.svg";
import armchairLux_occupied from "../../../assets/images/room/armchairLux_occupied.svg";
import armchair from "../../../assets/images/room/armchair.svg";
import armchair_selected from "../../../assets/images/room/armchair_selected.svg";
import armchair_selected_by_another from "../../../assets/images/room/armchair_selected_by_another_user.svg";
import armchair_occupied from "../../../assets/images/room/armchair_occupied.svg";
import { roomSeatTypes, furnitureItemTitle } from "../../../constants/constants";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const FurnitureItem = ({ cinemaId, sessionId, currentSeat, row, price, type, selectSeatHandler }) => {
  const { isOccupied, isSelected, place, userId } = currentSeat;
  const currentUserId = useSelector(state => state.userId);
  const [isTooltipVisible, setIsToolTipVisible] = useState(false);
  const [seatStatus, setSeatStatus] = useState(isOccupied ? "occupied" :
    isSelected && userId && userId !== currentUserId ? "selectedByAnother" :
      isSelected && userId === currentUserId ? "selected" :
        "default");

  const updatedSeat = {
    cinemaId,
    sessionId,
    userId: currentUserId,
    rowNumber: row,
    type,
    price,
    seatNumber: place,
    isSelected: seatStatus !== "selected",
    isOccupied: false
  };

  const selectHandler = () => {
    selectSeatHandler(updatedSeat);
  };

  const occupiedSeatMap = new Map()
    .set(roomSeatTypes.sofa, sofa_occupied)
    .set(roomSeatTypes.armchair, armchair_occupied)
    .set(roomSeatTypes.armchairLux, armchairLux_occupied);

  const selectedSeatMap = new Map()
    .set(roomSeatTypes.sofa, sofa_selected)
    .set(roomSeatTypes.armchair, armchair_selected)
    .set(roomSeatTypes.armchairLux, armchairLux_selected);

  const selectedByAnotherSeatMap = new Map()
    .set(roomSeatTypes.sofa, sofa_selected_by_another)
    .set(roomSeatTypes.armchair, armchair_selected_by_another)
    .set(roomSeatTypes.armchairLux, armchairLux_selected_by_another);

  const defaultSeatMap = new Map()
    .set(roomSeatTypes.sofa, sofa)
    .set(roomSeatTypes.armchair, armchair)
    .set(roomSeatTypes.armchairLux, armchairLux);

  const stateMap = new Map()
    .set("selected", selectedSeatMap)
    .set("selectedByAnother", selectedByAnotherSeatMap)
    .set("occupied", occupiedSeatMap)
    .set("default", defaultSeatMap);

  const getFurnitureItem = (state, type) => {
    const furnitureMapper = stateMap.get(state);
    return furnitureMapper.get(type);
  };

  useEffect(() => {
    const { isOccupied, isSelected } = currentSeat;
    setSeatStatus(isOccupied ? "occupied" :
      isSelected && userId && userId !== currentUserId ? "selectedByAnother" :
        isSelected && userId === currentUserId ? "selected" :
          "default");
  }, [currentSeat, currentUserId, userId]);

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
        className={ `furniture__sofa ${ isOccupied || (userId && userId !== currentUserId) ? "disabled" : "" }` }
        src={ getFurnitureItem(seatStatus, type) }
        alt={ getFurnitureItem(seatStatus, type) }
        width="100%"
        onMouseEnter={ () => setIsToolTipVisible(true) }
        onMouseLeave={ () => setIsToolTipVisible(false) }
        onClick={ () => !isOccupied && (!userId || userId === currentUserId) && selectHandler() }
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
