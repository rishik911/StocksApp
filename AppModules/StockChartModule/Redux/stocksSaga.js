import {all, call, put, takeLatest} from 'redux-saga/effects';
import {STOCK_TYPES} from './stocktypes';
import {isValidElement} from '../../../MyApp/Utils/helpers';
import {getResponseForStocksData} from '../Network/Network';

function* getDailyStockData(action) {
  if (
    isValidElement(action.api_token) &&
    isValidElement(action.stock_name) &&
    isValidElement(action.data_type)
  ) {
    try {
      const response = yield call(getResponseForStocksData, action);
      if (isValidElement(response) && isValidElement(response.data)) {
        if (isValidElement(response.data['Time Series (Daily)'])) {
          yield put({
            type: STOCK_TYPES.GET_DAILY_STOCKS_DATA_SUCCESS,
            payload: response.data['Time Series (Daily)'],
          });
        }
        if (isValidElement(response.data['Monthly Time Series'])) {
          yield put({
            type: STOCK_TYPES.GET_MONTHLY_DATA_SUCCESS,
            payload: response.data['Monthly Time Series'],
          });
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  }
}

function* stocksSaga() {
  yield all([takeLatest(STOCK_TYPES.GET_DAILY_STOCKS_DATA, getDailyStockData)]);
}

export default stocksSaga;
