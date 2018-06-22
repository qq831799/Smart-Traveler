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
  let newState = {...state};
  switch (action.type) {
    case actionType.UPDATE_FOCUS_DAY:
      newState.onfocus = action.payload;
      return newState;
    case actionType.ADD_LOCATION:
      console.log(newState);
      if(newState[newState.onfocus] === undefined){
        newState[newState.onfocus] ={date:new Date(),location:[]};
      }
      newState[newState.onfocus].location.push(action.payload);
      return newState;
    default:
      return state;
  }
}

export default locationReducer;
