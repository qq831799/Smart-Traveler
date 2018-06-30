import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTravelMode } from '../actions';
import TravelModeIcon from '../components/TravelModeIconList';

class TravelModeContainer extends Component {
  constructor(props){
    super(props);
    this.updateTravelMode = this.updateTravelMode.bind(this);
  }
  /*convertTravelMode(thisProps){
    switch ()
  }*/
  updateTravelMode(travelMode){
    this.props.actions.updateTravelMode(this.props.focusDay , travelMode);
  }
  render(){
    return (
      <TravelModeIcon  
      travelMode={this.props.travelMode}
      updateTravelMode={this.updateTravelMode}
      />
    )
  }
}
function mapStateToProps(state){
  return {
    travelMode: state.locationReducer.day[state.locationReducer.focusDay].travelMode,
    focusDay: state.locationReducer.focusDay,
  }
}
function mapDispatchToProps(dispatch){
  return{
    actions:{
      updateTravelMode: bindActionCreators(updateTravelMode,dispatch),
    } 
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TravelModeContainer);