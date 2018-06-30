import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CarIcon from '@material-ui/icons/DirectionsCar';
import BusIcon from '@material-ui/icons/DirectionsBus';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import SubwayIcon from '@material-ui/icons/DirectionsSubway';
import WalkerIcon from '@material-ui/icons/DirectionsWalk';
import { IconButton } from '@material-ui/core';

const styles = theme =>({
  icon: {

  },
});


class TravelModeIconList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const {classes} = this.props;
    return (
    <Grid container >
      <Grid item xs={12}>
        <IconButton  size="small" onClick={e => this.props.updateTravelMode('DRIVING')} color={this.props.travelMode === "DRIVING" ? "primary" : ""}>
          <CarIcon className={classes.icon} />
        </IconButton>
        <IconButton  size="small" onClick={e => this.props.updateTravelMode('BICYCLING')} color={this.props.travelMode === "BICYCLING" ? "primary" : ""}>
          <BikeIcon className={classes.icon}/>
        </IconButton> 
        <IconButton  size="small" onClick={e => this.props.updateTravelMode('WALKING')} color={this.props.travelMode === "WALKING" ? "primary" : ""}>
          <WalkerIcon className={classes.icon}/>
        </IconButton>
      </Grid>
    </Grid>
    )
  }
}
/**
  <IconButton  size="small" onClick={e => this.props.updateTravelMode('BUS')} color={this.props.travelMode === "BUS" ? "primary" : ""}>
    <BusIcon className={classes.icon}/>
  </IconButton>
  <IconButton  size="small" onClick={e => this.props.updateTravelMode('RAIL')} color={this.props.travelMode === "RAIL" ? "primary" : ""}>
    <SubwayIcon className={classes.icon}/>
  </IconButton>

 */
TravelModeIconList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TravelModeIconList);