// locationReducer.js
import * as actionType from '../actions/ActionType';
const initialState = {
  focusDay:1,  //default focus first day
  1 :{
    date:new Date(),
    isFocus:true,
    location:[]
  }
};
const locationReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case actionType.UPDATE_FOCUS_DAY:
      newState.focusDay = action.payload;
      newState[state.focusDay].isFocus = false;
      newState[action.payload].isFocus = true;
      return newState;
    case actionType.ADD_LOCATION:
      console.log(newState);
      if(newState[newState.focusDay] === undefined){
        newState[newState.focusDay] = {date:new Date(),location:[]};
      }
      newState[newState.focusDay].location.push(action.payload);
      return newState;
    default:
      return state;
  }
}

export default locationReducer;
