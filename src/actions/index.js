import * as actionType from './ActionType';

export const addCounter = () => ({
  type: actionType.ADD_COUNTER,
  payload: 1
});

export const removeCounter = () => ({
  type: actionType.REMOVE_COUNTER,
  payload: 1
});

export const addDateInterval = (startDate,endDate) => ({
  type: actionType.ADD_DATE_INTERVAL,
  startDate: startDate,
  endDate: endDate,
});