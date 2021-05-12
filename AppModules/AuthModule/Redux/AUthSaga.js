import {all, call, put, takeLatest} from 'redux-saga/effects';
import {AUTH_TYPES} from './AurhTypes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {delay} from 'react-native-reanimated/src/reanimated2/animations';

function* authSaga() {
  yield all([]);
}

export default authSaga;
