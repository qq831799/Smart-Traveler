import * as actionType from './ActionType';

export const addLocation = (place) => (
{
	type: actionType.ADD_LOCATION,
	payload: {
    name: place.name,
    id: place.id,
    address: place.address,
  }
});

export const deleteLocation = (dayID, index) => (
{
  type: actionType.DELETE_LOCATION,
  payload: {dayID: dayID, index: index}
});

export const updateLocationTime = (dayID, index, time) => (
{
  type: actionType.UPDATE_LOCATION_TIME
,
  payload: {dayID: dayID, index: index, time:time}
});

export const updateFocusDay = (dayID) => (
{
	type: actionType.UPDATE_FOCUS_DAY,
	payload: dayID
});

export const updateTripDuration = (startDate,endDate,duration) => (
{
  type: actionType.UPDATE_TRIP_DURATION,
  payload: {startDate: startDate, endDate: endDate, duration: duration}
});

export const updateTravelMode = (dayID, travelMode) => (
{
  type: actionType.UPDATE_TRAVEL_MODE,
  payload: {dayID: dayID, travelMode:travelMode}
});

