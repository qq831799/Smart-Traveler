import * as actionType from '../actions/ActionType';
const initialDate={
  startDate: new Date(),
  endDate: new Date(),
}
const dateIntervalReducer = (state = [initialDate], action) => {

  switch (action.type) {
    case actionType.ADD_DATE_INTERVAL:
      return [
        {
          startDate:action.startDate,
          endDate:action.endDate
        }
      ]
    default:
      return state
  }
}


export default dateIntervalReducer;