import sofa from "../../../assets/images/room/sofa.svg";
import armchairLux from "../../../assets/images/room/armchairLux.svg";
import armchair from "../../../assets/images/room/armchair.svg";
import { roomSeatTypes } from "../../../constants/constants";
import PropTypes from "prop-types";
import React from "react";

const BuyTickets = ({ selectedSeats, unselectSeat, roomId }) => {
  const furnitureItem = new Map()
    .set(roomSeatTypes.sofa, sofa)
    .set(roomSeatTypes.armchair, armchair)
    .set(roomSeatTypes.armchairLux, armchairLux);

  const getTotalPrice = selectedSeats => {
    const prices = [];
    selectedSeats.forEach(item => prices.push(item.price));
    return prices.reduce((acc, price) => acc + price, 0);
  };

  return (
    <div className="buy-tickets">
      <h2>Купить билеты</h2>
      <div className="selected-seats">
        {
          selectedSeats.map(item => {
            const { rowNumber, type, price, seatNumber } = item;
            const ucFirst = word => word[0].toUpperCase() + word.slice(1);

            return (
              <div className="selected-seats__item" key={ `${ type }-${ rowNumber }-${ seatNumber }` }>
                <div className="item-image">
                  <img src={ furnitureItem.get(type) } alt={ type } />
                </div>
                <div className="item-description">
                  <div className="item-seat-price">
                    <span className="item-seat">{ rowNumber } ряд / { seatNumber } место</span>
                    <span className="item-price">{ price }.00 BYN</span>
                  </div>
                  <span className="item-seat-type">Тип места: { ucFirst(type) }</span>
                </div>
                <span className="close-button" onClick={ () => unselectSeat({ roomId, rowNumber, seatNumber, isSelected: false }) }></span>
              </div>
            );
          })
        }
      </div>
      <span className="buy-tickets__total-price">Стоимость: { getTotalPrice(selectedSeats) }.00 BYN</span>
      <button className="buy-tickets__buy-button">Купить</button>
    </div>
  );
};

export default BuyTickets;

BuyTickets.propTypes = {
  selectedSeats: PropTypes.array,
  unselectSeat: PropTypes.func,
  roomId: PropTypes.string
};
