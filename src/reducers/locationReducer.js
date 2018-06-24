// locationReducer.js
import * as actionType from '../actions/ActionType';
import produce from "immer";

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
  let nextState;
  nextState = produce(state, draftState => {
    switch (action.type) {
      case actionType.UPDATE_FOCUS_DAY:
        draftState.focusDay = action.payload;
        draftState.day[state.focusDay].isFocus = false;
        draftState.day[draftState.focusDay].isFocus = true;
        break;
      case actionType.ADD_LOCATION:
        draftState.day[draftState.focusDay].location.push(action.payload);
        break;
      case actionType.UPDATE_TRIP_INTERVAL:
        draftState.startDate = action.payload.startDate;
        draftState.endDate = action.payload.endDate;
        let startDate = new Date(draftState.startDate);
        let endDate = new Date(draftState.endDate);
        //console.log((endDate-startDate)/(24*3600*1000) + 1);
        let tmpDay = {};
        var i;
        for(i = 0 ; i < ((endDate-startDate)/(24*3600*1000) + 1) ; i++){
          let tmpDate = new Date(draftState.startDate);
          let dayID = i+1;
          tmpDate.setDate(startDate.getDate()+i);
          if(draftState.day[dayID] === undefined){
            draftState.day[dayID] = {location: []};
          }
          draftState.date = new Date(tmpDate);
          draftState.isFocus = false;
          // let prevLocation = draftState.day[dayID] !== undefined ? draftState.day[dayID] : {location: []};
          // tmpDay[dayID] = {...prevLocation,date: new Date(tmpDate), isFocus:false};
        }
        // draftState.day = tmpDay;
        draftState.focusDay = 1;
        draftState.day[1].isFocus = true;
        // console.log(draftState.day[1].location === state.day[1].location);
    }
  });
  console.log(state.day[1].location === nextState.day[1].location);
  return nextState;
}

export default locationReducer;
