import sofa from "../../../assets/images/room/sofa.svg";
import armchairLux from "../../../assets/images/room/armchairLux.svg";
import armchair from "../../../assets/images/room/armchair.svg";
import { roomSeatTypes } from "../../../constants/constants";
import { doFetch } from "../../../services/services";
import { urls } from "../../../constants/constants";
import { getTotalPrice } from "../room.services";
import PropTypes from "prop-types";
import React from "react";

const BuyTickets = ({ selectedSeats, unselectSeatHandler, sessionId, cinemaId }) => {
  const furnitureItem = new Map()
    .set(roomSeatTypes.sofa, sofa)
    .set(roomSeatTypes.armchair, armchair)
    .set(roomSeatTypes.armchairLux, armchairLux);

  const seatsToBuy = async () => {
    const seatsToBuy = selectedSeats;
    seatsToBuy.forEach(item => item.isOccupied = true);

    await doFetch(urls.occupiseat, {
      method: "put",
      body: {
        sessionId,
        seatsToBuy,
      }
    });
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
                <span className="close-button" onClick={ () => unselectSeatHandler({ cinemaId, sessionId, rowNumber, seatNumber, isSelected: false }) }></span>
              </div>
            );
          })
        }
      </div>
      <span className="buy-tickets__total-price">Стоимость: { getTotalPrice(selectedSeats) }.00 BYN</span>
      <button className="buy-tickets__buy-button" onClick={ () => seatsToBuy() }>Купить</button>
    </div>
  );
};

export default BuyTickets;

BuyTickets.propTypes = {
  selectedSeats: PropTypes.array,
  unselectSeatHandler: PropTypes.func,
  sessionId: PropTypes.string,
  cinemaId: PropTypes.string
};
