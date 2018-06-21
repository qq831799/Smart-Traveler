import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import dateIntervalReducer from './dateIntervalReducer';

const counterApp = combineReducers({
  counterReducer,
  dateIntervalReducer
})

export default counterApp