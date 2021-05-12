import {combineReducers} from 'redux';
import AuthReducers from '../../AppModules/AuthModule/Redux/AuthReducers';
import StocksReducer from '../../AppModules/StockChartModule/Redux/stocksReducer';

const appReducer = combineReducers({
  //appState: appsReducer,
  authReducer: AuthReducers,
  stocksReducer: StocksReducer,
});

const rootReducer = (state, action) => {
  //TODO WHILE LOGOUT CLEAR ALL
  /* if (action.type === AuthTypes.LOGIN_API.LOGOUT_ACTION) {
      Object.keys(state).forEach((key) => {
          storage.removeItem(`persist:${key}`);
      });
      state = undefined;
  }*/
  return appReducer(state, action);
};

export default rootReducer;
