import {AUTH_TYPES} from './AurhTypes';

export const getUserDataAction = data => {
  return {
    type: AUTH_TYPES.GET_USER_DATA,
    data,
  };
};
export const logoutUserAction = () => {
  console.log('called actions')
  return {
    type: AUTH_TYPES.LOGOUT_ACTION,
  };
};
