// locationReducer.js
import * as actionType from '../actions/ActionType';

const today = new Date();
const initialState = {
  startDate: today,
  endDate: today,
  focusDay: 1,  //default focus first day
  day:{
    1:{
      location:[],
      date:new Date(),
      isFocus:true
    }
  }
};
const locationReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case actionType.UPDATE_FOCUS_DAY:
      newState.focusDay = action.payload;
      newState.day[state.focusDay].isFocus = false;
      newState.day[newState.focusDay].isFocus = true;
      console.log(newState);

      return newState;
    case actionType.ADD_LOCATION:
      // if(newState[newState.focusDay] === undefined){
      //   newState[newState.focusDay] = {date:new Date(),location:[]};
      // }
      newState.day[newState.focusDay].location.push(action.payload);
      return newState;
    case actionType.UPDATE_TRIP_INTERVAL:
      newState.startDate = action.payload.startDate;
      newState.endDate = action.payload.endDate;
      let startDate = new Date(newState.startDate);
      let endDate = new Date(newState.endDate);
      //console.log((endDate-startDate)/(24*3600*1000) + 1);
      let tmpDay = {};
      var i;
      for(i = 0 ; i < ((endDate-startDate)/(24*3600*1000) + 1) ; i++){
        let tmpDate = new Date(newState.startDate);
        let isFocus = false;
        let dayID = i+1;
        tmpDate.setDate(startDate.getDate()+i);
        if(newState.focusDay === dayID){
          isFocus = true;
        }
        let prevLocation = newState.day[dayID] !== undefined ? newState.day[dayID] : {location: []};
        tmpDay[dayID] = {...prevLocation,date: new Date(tmpDate), isFocus:isFocus};
      }
      newState.day = tmpDay;
      console.log(newState);
      return newState;
    default:
      return state;
  }
}

export default locationReducer;
