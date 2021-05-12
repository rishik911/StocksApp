import {AUTH_TYPES} from './AurhTypes';

const INITIAL_STATE = {
  userData: null,
  isLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_TYPES.GET_USER_DATA:
      return {
        ...state,
        userData: action.data,
        isLoggedIn: true,
      };
    case AUTH_TYPES.LOGOUT_ACTION:
      return {
        ...state,
        userData: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
