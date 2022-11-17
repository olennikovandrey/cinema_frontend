import {
  CHECK_IS_LOGIN_MODAL_OPEN,
  CHECK_IS_REGISTER_MODAL_OPEN,
  CHECK_IS_SEARCH_MODAL_OPEN,
  CHECK_IS_PROFILE_MODAL_OPEN,
  CHECK_IS_ADMIN_MODAL_OPEN,
  CHECK_IS_USER_AUTHORIZED,
  CHECK_IS_USER_ADMIN,
  SET_MOVIES,
  SET_CINEMAS,
  SET_RANDOM_MOVIES,
  SET_USER_LEFT,
  SET_USER_PERSONAL_DATA,
  SET_CURRENT_CINEMA,
  CHECK_IS_LOADER_OPEN,
  SET_CASHED_MOVIES
} from "./actions/action-types";

export const initState = {
  isUserAdmin: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isSearchModalOpen: false,
  isProfileModalOpen: false,
  isAdminModalOpen: false,
  isUserAuthorized: false,
  userData: {},
  movies: [],
  cinemas: [],
  cashedMovies: [],
  randomMovies: [],
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
    // it seams that it is better to use openModalName here instead all above
    // if we openModal we use Action - SET_OPENED_MODAL_NAME and pass corresponding name
    // when we close it - we pass null

    // and refactor logic, for example in LoginForm component instead thise one:
    // const isLoginModalOpen = useSelector(state => state.isLoginModalOpen);
    // we can use const isLoginModalOpen = useSelector(state => state.openModalName) === 'LOGIN_MODAL';
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
