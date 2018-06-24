import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../containers/DatePicker';
import ScheduleContainer from '../containers/ScheduleContainer';
import MapContainer from '../containers/MapContainer';
import Paper from '@material-ui/core/Paper';
import Grey from '@material-ui/core/colors/grey';
import Green from '@material-ui/core/colors/green';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root:{
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  appBar:{
    backgroundColor: Green[500],
    flex: '0 1 auto',
  },
  containBody:{
    flex: '1 1 auto',
  },
  scheduleRoot:{
    paddingRight: '1em',
    paddingLeft: '1em',
    paddingTop: '1em',
    backgroundColor: Grey[200],
    borderRight: '1px solid',
    borderRightColor : Grey[700],
  },
  scheduleContainRoot:{
    marginTop: '1em',
  },
  mapRoot:{
    flexGrow: 1,
  },
});

const App = (props) => {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Smart-Traveler
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.containBody}>    
        <Grid item xs={6} className={classes.scheduleRoot}>
          <Paper className={classes.datePickerContainRoot}>
            <DatePicker></DatePicker>
          </Paper>
          <Paper className={classes.scheduleContainRoot}>
            <ScheduleContainer></ScheduleContainer>
          </Paper>
        </Grid>
        <Grid item xs={6} className={classes.mapRoot}>
          <MapContainer></MapContainer>
        </Grid>
      </Grid>
    </div>
  )
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);