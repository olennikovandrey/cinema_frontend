import sofa from "../../../assets/images/room/sofa.svg";
import armchairLux from "../../../assets/images/room/armchairLux.svg";
import armchair from "../../../assets/images/room/armchair.svg";
import { roomSeatTypes } from "../../../constants/constants";
import { getTotalPrice } from "../../../services/services";
import { CHECK_IS_EMAIL_MODAL_OPEN } from "../../../store/actions/action-types";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SelectedSeats = ({ unselectSeatHandler, sessionId, cinemaId, movieInfo, editable = true }) => {
  const selectedSeats = useSelector(state => state.selectedSeats);
  const dispatch = useDispatch();
  const furnitureItem = new Map()
    .set(roomSeatTypes.sofa, sofa)
    .set(roomSeatTypes.armchair, armchair)
    .set(roomSeatTypes.armchairLux, armchairLux);

  return (
    <div className={ editable ? "selected-seats" : "selected-seats-in-buy" }>
      <h2>Выбранные места</h2>
      <div className="items-wrapper">
        {
          selectedSeats.map(item => {
            const { rowNumber, type, price, seatNumber } = item;
            const ucFirst = word => word[0].toUpperCase() + word.slice(1);

            return (
              <div className="items-wrapper__item" key={ `${ type }-${ rowNumber }-${ seatNumber }` }>
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
                { editable &&
                  <span className="close-button" onClick={ () => unselectSeatHandler({ cinemaId, sessionId, rowNumber, seatNumber, isSelected: false }) }></span>
                }
              </div>
            );
          })
        }
      </div>
      { editable &&
        <>
          <span className="selected-seats__total-price">Стоимость: { getTotalPrice(selectedSeats) }.00 BYN</span>
          <button className="button-pink" onClick={ () => dispatch({ type: CHECK_IS_EMAIL_MODAL_OPEN, payload: true }) }>
              Перейти к покупке
          </button>
          <span className="fake-link">
            <Link to="/buytickets" state={ { movieInfo: movieInfo } }>sdfsdf</Link>
          </span>
        </>
      }
    </div>
  );
};

export default SelectedSeats;

SelectedSeats.propTypes = {
  selectedSeats: PropTypes.array,
  unselectSeatHandler: PropTypes.func,
  sessionId: PropTypes.string,
  cinemaId: PropTypes.string,
  movieInfo: PropTypes.object,
  editable: PropTypes.bool
};