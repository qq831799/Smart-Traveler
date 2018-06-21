import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import locationReducer from './locationReducer';
import dateIntervalReducer from './dateIntervalReducer';

const counterApp = combineReducers({
  counterReducer,
  dateIntervalReducer,
  locationReducer
})

export default counterApp