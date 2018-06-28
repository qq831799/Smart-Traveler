import { combineReducers } from 'redux';
import locationReducer from './locationReducer';

const counterApp = combineReducers({
  locationReducer
})

export default counterApp