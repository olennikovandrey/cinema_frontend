import {
  CHECK_IS_LOGIN_MODAL_OPEN,
  CHECK_IS_REGISTER_MODAL_OPEN,
  CHECK_IS_SEARCH_MODAL_OPEN,
  CHECK_IS_PROFILE_MODAL_OPEN,
  CHECK_IS_ADMIN_MODAL_OPEN,
  CHECK_IS_EMAIL_MODAL_OPEN,
  CHECK_IS_USER_AUTHORIZED,
  CHECK_IS_USER_ADMIN,
  SET_MOVIES,
  SET_CINEMAS,
  SET_RANDOM_MOVIES,
  SET_USER_LEFT,
  SET_USER_PERSONAL_DATA,
  SET_CURRENT_CINEMA,
  CHECK_IS_LOADER_OPEN,
  SET_CASHED_MOVIES,
  SET_SELECTED_SEATS
} from "./actions/action-types";

export const initState = {
  isUserAdmin: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isSearchModalOpen: false,
  isProfileModalOpen: false,
  isAdminModalOpen: false,
  isEmailModalOpen: false,
  isUserAuthorized: false,
  userData: {},
  movies: [],
  cinemas: [],
  cashedMovies: [],
  randomMovies: [],
  selectedSeats: [],
  currentCinema: "MovieHD",
  isLoader: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
  case CHECK_IS_USER_ADMIN: {
    return {
      ...state,
      isUserAdmin: true
    };
  }

  case CHECK_IS_LOGIN_MODAL_OPEN: {
    return {
      ...state,
      isLoginModalOpen: action.payload,
      isRegisterModalOpen: false,
      isSearchModalOpen: false,
      isProfileModalOpen: false,
      isAdminModalOpen: false,
    };
  }

  case CHECK_IS_REGISTER_MODAL_OPEN: {
    return {
      ...state,
      isLoginModalOpen: false,
      isRegisterModalOpen: action.payload,
      isSearchModalOpen: false,
      isProfileModalOpen: false,
      isAdminModalOpen: false,
    };
  }

  case CHECK_IS_PROFILE_MODAL_OPEN: {
    return {
      ...state,
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      isSearchModalOpen: false,
      isProfileModalOpen: action.payload,
      isAdminModalOpen: false,
    };
  }

  case CHECK_IS_ADMIN_MODAL_OPEN: {
    return {
      ...state,
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      isSearchModalOpen: false,
      isProfileModalOpen: false,
      isAdminModalOpen: action.payload,
    };
  }

  case CHECK_IS_EMAIL_MODAL_OPEN: {
    return {
      ...state,
      isEmailModalOpen: action.payload,
    };
  }

  case CHECK_IS_SEARCH_MODAL_OPEN: {
    return {
      ...state,
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      isSearchModalOpen: action.payload,
      isProfileModalOpen: false,
      isAdminModalOpen: false,
    };
  }

  case CHECK_IS_USER_AUTHORIZED: {
    return {
      ...state,
      isUserAuthorized: true
    };
  }

  case SET_USER_LEFT: {
    localStorage.setItem("cinema_token", "");
    return {
      ...state,
      isUserAuthorized: false,
      isUserAdmin: false
    };
  }

  case SET_MOVIES: {
    return {
      ...state,
      movies: action.payload
    };
  }

  case SET_CINEMAS: {
    return {
      ...state,
      cinemas: action.payload
    };
  }

  case SET_RANDOM_MOVIES: {
    return {
      ...state,
      randomMovies: action.payload
    };
  }

  case SET_CASHED_MOVIES: {
    return {
      ...state,
      cashedMovies: action.payload
    };
  }

  case SET_USER_PERSONAL_DATA: {
    return {
      ...state,
      userData: action.payload,
    };
  }

  case SET_SELECTED_SEATS: {
    return {
      ...state,
      selectedSeats: action.payload,
    };
  }

  case SET_CURRENT_CINEMA: {
    return {
      ...state,
      currentCinema: action.payload,
    };
  }

  case CHECK_IS_LOADER_OPEN: {
    return {
      ...state,
      isLoader: action.payload
    };
  }

  default: {
    return {
      ...state
    };
  }
  }
};

export default reducer;
