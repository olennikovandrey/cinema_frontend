import { CHECK_IS_LOGIN_MODAL_OPEN,
  CHECK_IS_SEARCH_MODAL_OPEN,
  CHECK_IS_PROFILE_MODAL_OPEN,
  CHECK_IS_ADMIN_MODAL_OPEN,
  SET_USER_LEFT,
  SET_CURRENT_CINEMA
} from "../../store/actions/action-types";
import searchActiveIcon from "../../assets/images/header/search_active.svg";
import profileActiveIcon from "../../assets/images/header/profile_active.svg";
import settingsActiveIcon from "../../assets/images/header/settings_active.svg";
import DropDown from "../DropDown/DropDown";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpen);
  const isSearchModalOpen = useSelector(state => state.isSearchModalOpen);
  const isUserAuthorized = useSelector(state => state.isUserAuthorized);
  const isUserAdmin = useSelector(state => state.isUserAdmin);
  const isAdminModalOpen = useSelector(state => state.isAdminModalOpen);
  const isProfileModalOpen = useSelector(state => state.isProfileModalOpen);
  const currentCinema = useSelector(state => state.currentCinema);
  const cinemas = useSelector(state => state.cinemas);
  const dispatch = useDispatch();

  const dropdownCinemas = () => {
    return cinemas.map(({ title }) => Object.freeze({ value: title, criterion: title }));
  };

  const setCinema = cinema => {
    dispatch({ type: SET_CURRENT_CINEMA, payload: cinema });
  };

  return (
    <header className="header">
      <div className="header__dropdown">
        <DropDown
          stateFunc={ setCinema }
          optionValues={ dropdownCinemas() }
          preClassName="cinema"
          checkedValue={ currentCinema }
        />
      </div>

      <div className="navs-box">
        <nav
          className="navs-box__search"
          style={ isSearchModalOpen ? { borderBottom: "3px solid #e17602", backgroundImage: `url(${ searchActiveIcon } )` } : null }
          onClick={ () => dispatch({ type: CHECK_IS_SEARCH_MODAL_OPEN, payload: !isSearchModalOpen }) }
        ></nav>
        { !isUserAuthorized ?
          <nav
            className="navs-box__login"
            style={ isLoginModalOpen ? { borderBottom: "3px solid #045d88" } : null }
            onMouseEnter={ () => dispatch({ type: CHECK_IS_LOGIN_MODAL_OPEN, payload: !isLoginModalOpen }) }
          >
          Вход
          </nav> :
          <>
            <nav
              className="navs-box__profile"
              style={ isProfileModalOpen ? { borderBottom: "3px solid #db4cf8", backgroundImage: `url(${ profileActiveIcon } )` } : null }
              onClick={ () => dispatch( { type: CHECK_IS_PROFILE_MODAL_OPEN, payload: !isProfileModalOpen }) }
            ></nav>
            {
              isUserAdmin &&
              <nav
                className="navs-box__admin-panel"
                style={ isAdminModalOpen ? { borderBottom: "3px solid #7ef865", backgroundImage: `url(${ settingsActiveIcon } )` } : null }
                onClick={ () => dispatch( { type: CHECK_IS_ADMIN_MODAL_OPEN, payload: !isAdminModalOpen }) }
              ></nav>
            }
            <nav
              className="navs-box__exit"
              onClick={ () => dispatch({ type: SET_USER_LEFT })}
            ></nav>
          </>
        }
      </div>
    </header>
  );
};

export default Header;
