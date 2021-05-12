import {STOCK_TYPES} from './stocktypes';
const INITIAL_STATE = {
  dailyStockData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STOCK_TYPES.GET_DAILY_STOCKS_DATA_SUCCESS:
      return {
        ...state,
        dailyStockData: action.payload,
      };
    default:
      return state;
  }
};
