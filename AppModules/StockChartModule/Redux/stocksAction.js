import {STOCK_TYPES} from './stocktypes';

export const getDailyStocksAction = (
  api_token,
  stock_name,
  data_type,
  show_full,
) => {
  return {
    type: STOCK_TYPES.GET_DAILY_STOCKS_DATA,
    api_token,
    stock_name,
    data_type,
    show_full,
  };
};
