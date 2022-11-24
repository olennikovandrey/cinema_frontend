import { useOnClickOutside } from "../../hooks/clickOutside";
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const DropDown = ({ stateFunc, optionValues, preClassName, checkedValue }) => {
  const [isVisible, setIsVisibe] = useState(false);
  const dropDownWrapper = useRef(null);
  const dropDown = dropDownWrapper.current;

  const handleClick = e => {
    e.stopPropagation();
    setIsVisibe(false);
    dropDown.dataset.state = "";
    const selectedCinema = e.target.dataset.criterion;
    stateFunc(selectedCinema);
  };

  const toggleDDListVisibility = () => {
    setIsVisibe(state => !state);
  };

  useOnClickOutside(dropDownWrapper, () => setIsVisibe(false));

  const DropDownCheckedValue = ({ children }) => {
    return (
      <div
        className={`dropdown-${ preClassName }__title` }
        onClick={ () => toggleDDListVisibility() }
      >
        { children }
      </div>
    );
  };

  DropDownCheckedValue.propTypes = {
    children: PropTypes.string
  };

  return (
    <div className={ `dropdown-${ preClassName }` }>
      <div className={ `dropdown-${ preClassName }__wrapper` } ref={ dropDownWrapper } data-state={ isVisible ? "active" : "" }>
        <DropDownCheckedValue>
          { checkedValue }
        </DropDownCheckedValue>
        <div className={ `dropdown-${ preClassName }__content` }>
          { optionValues.map(({ name, value, criterion }) =>
            <React.Fragment key={ value }>
              <input id={ value } className={ `dropdown-${ preClassName }__input` } type="radio" name="singleDropDown" data={ name } />
              <label
                htmlFor={ value }
                className={ `dropdown-${ preClassName }__label` }
                data-criterion={ criterion }
                onClick={ e => handleClick(e) }
              >
                { value }
              </label>
            </React.Fragment>
          ) }
        </div>
      </div>
    </div>
  );
};

export default DropDown;

DropDown.propTypes = {
  stateFunc: PropTypes.func,
  optionValues: PropTypes.array,
  preClassName: PropTypes.string,
  checkedValue: PropTypes.string
};
