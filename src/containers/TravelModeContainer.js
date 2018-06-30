import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TravelModeIcon from '../components/TravelModeIconList';

class TravelModeContainer extends Component {
  constructor(props){
    super(props);
  }
  /*convertTravelMode(thisProps){
    switch ()
  }*/
  render(){
    return (
      <TravelModeIcon  travelMode="DRIVING"/>
    )
  }

}

export default TravelModeContainer;