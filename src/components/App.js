import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../containers/DatePicker';
import ScheduleContainer from '../containers/ScheduleContainer';

const styles = theme => ({
  root:{
    flexGrow: 1,
  },
  scheduleRoot:{
    backgroundColor:'#2e5eaa',
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
        <DatePicker></DatePicker>
        <ScheduleContainer></ScheduleContainer>
      </Grid>
      <Grid item xs={6} className={classes.mapRoot}>
        <h1 className={classes.MapTitle}>MAP</h1>
      </Grid>
    </Grid>
  )
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
