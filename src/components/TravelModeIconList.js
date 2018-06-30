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
    color: '#000000',
    margin: theme.spacing.unit,
  },
});


class TravelModeIconList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const {classes} = this.props;
    return (
    <Grid container>
      <Grid item xs={12}>
        <IconButton  size="small">
          <CarIcon className={classes.icon} />
        </IconButton >
        <IconButton  size="small">
          <BusIcon className={classes.icon}/>
        </IconButton >
        <IconButton  size="small">
          <SubwayIcon className={classes.icon}/>
        </IconButton  >
        <IconButton  size="small">
          <BikeIcon className={classes.icon}/>
        </IconButton >
        <IconButton  size="small">
          <WalkerIcon className={classes.icon}/>
        </IconButton >
      </Grid>
    </Grid>
    )
  }

}
TravelModeIconList.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TravelModeIconList);