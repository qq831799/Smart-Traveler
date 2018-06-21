import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../containers/DatePicker';
import ScheduleContainer from '../containers/ScheduleContainer';
import MapContainer from '../containers/MapContainer';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root:{
    flexGrow: 1,
  },
  scheduleRoot:{

  },
  mapRoot:{
    backgroundColor:'#7cea9c',
  },
  MapTitle:{
    marginTop: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: 'fit-content',
    width: '-webkit-fit-content',
    width: '-moz-fit-content',
  }

});

const App = (props) => {
  const {classes} = props;

  return (
    <Grid container className={classes.root} spacing={16}>    
      <Grid item xs={6} className={classes.scheduleRoot}>
        <Paper>
          <DatePicker></DatePicker>
          <ScheduleContainer></ScheduleContainer>
        </Paper>
      </Grid>
      <Grid item xs={6} className={classes.mapRoot}>
        <MapContainer></MapContainer>
      </Grid>
    </Grid>
  )
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);