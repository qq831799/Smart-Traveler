import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import locationReducer from './locationReducer';
const counterApp = combineReducers({
  counterReducer,locationReducer
})

export default counterApp