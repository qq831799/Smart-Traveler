// locationReducer.js
import * as actionType from '../actions/ActionType';
const initialState = {
	name: '',
	id: '',
	address: ''
};
const locationReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionType.ADD_LOCATION:
      return newState = action.payload;
    default:
      return state;
  }
}

export default locationReducer;
