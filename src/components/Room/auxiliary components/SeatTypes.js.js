import { seatTypes } from "../../../constants/constants";
import React from "react";

const SeatTypes = () => {
  return (
    <div className="seat-types">
      <h2>Типы мест</h2>
      {
        seatTypes.map(({ title, price, image, description }) =>
          <div className="seat-item" key={ title }>
            <img className="seat-item__image"src={ image } alt={ title } />
            <div className="seat-item__description">
              <header>
                <span>{ title }</span>
                <span>{ price } BYN</span>
              </header>
              <span>{ description }</span>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default SeatTypes;
