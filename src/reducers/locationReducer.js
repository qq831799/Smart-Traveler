// locationReducer.js
import * as actionType from '../actions/ActionType';
const initialState = {
  onfocus:1,  //default focus first day
  1 :{
    date:new Date(),
    location:[]
  }
};
const locationReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actionType.ADD_LOCATION:
    newState = {...state};
    newState[newState.onfocus].location.push(action.payload);
      return newState;
    default:
      return state;
  }
}

export default locationReducer;
