// locationReducer.js
import * as actionType from '../actions/ActionType';
const initialState = {
  startDate: new Date(),
  endDate: new Date(),
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
      newState[newState.focusDay].isFocus = true;
      console.log(newState);
      return newState;
    case actionType.ADD_LOCATION:
      // if(newState[newState.focusDay] === undefined){
      //   newState[newState.focusDay] = {date:new Date(),location:[]};
      // }
      newState[newState.focusDay].location.push(action.payload);
      return newState;
    case actionType.UPDATE_TRIP_INTERVAL:
      newState.startDate = action.payload.startDate;
      newState.endDate = action.payload.endDate;
      let startDate = new Date(newState.startDate);
      let endDate = new Date(newState.endDate);
      // console.log((newState.endDate-newState.startDate)/(24*3600*1000) + 1);
      
      for(let i = 0 ; i < (endDate-startDate)/(24*3600*1000) + 1 ; i++){
        if(newState[i+1] === undefined){
          let tmpDate = startDate;
          tmpDate.setDate(tmpDate.getDate()+i)
          newState[i+1] = {date: tmpDate, location:[]};
        }
      }
      return newState;
    default:
      return state;
  }
}

export default locationReducer;
