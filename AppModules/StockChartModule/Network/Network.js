import axios from 'axios';
import {NETWORK_CONSTANTS} from './constants';

export function getResponseForStocksData(params) {
  return axios.get(NETWORK_CONSTANTS.BASE_URL, {
    params: {
      function: params.data_type,
      symbol: params.stock_name,
      apikey: params.api_token,
      datatype: JSON,
      outputsize: params.show_full,
    },
  });
}
