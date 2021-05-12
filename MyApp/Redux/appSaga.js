import authSaga from '../../AppModules/AuthModule/Redux/AUthSaga';
import {all} from 'redux-saga/effects';
import stocksSaga from '../../AppModules/StockChartModule/Redux/stocksSaga';
export default function* IndexSaga() {
  yield all([authSaga(), stocksSaga()]);
}
