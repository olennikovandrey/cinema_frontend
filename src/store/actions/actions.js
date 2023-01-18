import { CHECK_IS_LOGIN_MODAL_OPEN,
  CHECK_IS_REGISTER_MODAL_OPEN,
  CHECK_IS_SEARCH_MODAL_OPEN,
  CHECK_IS_PROFILE_MODAL_OPEN,
  CHECK_IS_ADMIN_MODAL_OPEN,
  CHECK_IS_EMAIL_MODAL_OPEN,
  SET_MOVIES,
  SET_CINEMAS,
  CHECK_IS_USER_AUTHORIZED,
  SET_USER_LEFT,
  CHECK_IS_USER_ADMIN,
  SET_USER_PERSONAL_DATA,
  SET_CURRENT_CINEMA,
  CHECK_IS_LOADER_OPEN,
  SET_RANDOM_MOVIES,
  SET_CASHED_MOVIES,
  SET_SELECTED_SEATS,
  SET_EMAIL_FOR_TICKETS,
  SET_IS_PAYMENT_SUCCESS,
  SET_USER_ID } from "./action-types";

export const setIsLoginOpen = (payload) => {
  return {
    type: CHECK_IS_LOGIN_MODAL_OPEN,
    payload
  };
};

export const setIsRegisterOpen = (payload) => {
  return {
    type: CHECK_IS_REGISTER_MODAL_OPEN,
    payload
  };
};

export const setIsProfileOpen = (payload) => {
  return {
    type: CHECK_IS_PROFILE_MODAL_OPEN,
    payload
  };
};

export const setIsAdminOpen = (payload) => {
  return {
    type: CHECK_IS_ADMIN_MODAL_OPEN,
    payload
  };
};

export const setIsEmailModalOpen = (payload) => {
  return {
    type: CHECK_IS_EMAIL_MODAL_OPEN,
    payload
  };
};

export const setIsSearchOpen = (payload) => {
  return {
    type: CHECK_IS_SEARCH_MODAL_OPEN,
    payload
  };
};

export const setMovies = (movies) => {
  return {
    type: SET_MOVIES,
    movies
  };
};

export const setCinemas = (cinemas) => {
  return {
    type: SET_CINEMAS,
    cinemas
  };
};

export const setSelectedSeats = (selectedSeats) => {
  return {
    type: SET_SELECTED_SEATS,
    selectedSeats
  };
};

export const setRandomMovies = (randomMovies) => {
  return {
    type: SET_RANDOM_MOVIES,
    randomMovies
  };
};

export const setCashedMovies = (cashedMovies) => {
  return {
    type: SET_CASHED_MOVIES,
    cashedMovies
  };
};

export const setIsUserAuthorized = () => {
  return {
    type: CHECK_IS_USER_AUTHORIZED
  };
};

export const setIsUserLeft = () => {
  return {
    type: SET_USER_LEFT
  };
};

export const setIsUserAdmin = (payload) => {
  return {
    type: CHECK_IS_USER_ADMIN,
    payload
  };
};

export const setUserPersonalData = () => {
  return {
    type: SET_USER_PERSONAL_DATA
  };
};

export const setCurrentCity = (city) => {
  return {
    type: SET_CURRENT_CINEMA,
    city
  };
};

export const setIsLoader = (value) => {
  return {
    type: CHECK_IS_LOADER_OPEN,
    value
  };
};

export const setEmailForTickets = (email) => {
  return {
    type: SET_EMAIL_FOR_TICKETS,
    email
  };
};

export const setIsPaymentSuccess = (result) => {
  return {
    type: SET_IS_PAYMENT_SUCCESS,
    result
  };
};

export const setSocketID = (id) => {
  return {
    type: SET_USER_ID,
    id
  };
};
