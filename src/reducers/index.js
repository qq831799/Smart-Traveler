import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import locationReducer from './locationReducer';
import dateIntervalReducer from './dateIntervalReducer';

const counterApp = combineReducers({
  locationReducer
})

export default counterApp