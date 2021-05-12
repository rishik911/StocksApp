import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IndexReducer from './indexReducer';
import IndexSaga from './appSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middleware = [sagaMiddleware];

const pReducer = persistReducer(persistConfig, IndexReducer);
export const store = createStore(pReducer, applyMiddleware(...middleware));

sagaMiddleware.run(IndexSaga);
export const persistor = persistStore(store);

export default [store, persistor];
