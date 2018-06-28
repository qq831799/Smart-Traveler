import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Day from '../components/Day'
import { updateFocusDay,deleteLocation } from '../actions';


const styles = theme => ({
    scheduleContainer:{
      height: '70vh',
      maxHeight: '100%',
      overflowX: 'auto',
<<<<<<< HEAD
=======
      overflowY: 'auto',
>>>>>>> 18658afa81d054fc6d911f96281ca63cc165710e
    },
    spaceContent:{
      height: '2em',
    }
  });

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this); // theNewJson need remark
  }
  //***the below is probably not needed anymore
  // calculateDate(props){ //calculate the days between two date
  //   // console.log(props);
  //   let startDate = new Date(props.schedule.startDate);
  //   let endDate = new Date(props.schedule.endDate);
  //   console.log((endDate-startDate)/(24*3600*1000) + 1);
  //   return (endDate-startDate)/(24*3600*1000) + 1;  //divide by (24*3600*1000) because the unit of difference is microsecond
  // }
  focus(dayID){
    console.log(dayID);
    this.props.actions.updateFocusDay(dayID);
  }
  render() {
    const {classes} = this.props;
    const {schedule} = this.props;
    return (
      <Grid container>
        <Grid item xs={12} className={ classes.scheduleContainer}>
          
            {[...Array(schedule.duration)].map(
              (e , i) => {return <Day dayID={i+1} key={'day' + i + 1} schedule={schedule} 
              onFocus={this.focus} deleteLocation={this.props.actions.deleteLocation}></Day>}
            )}
          <div className={classes.spaceContent}></div>
        </Grid>
      </Grid>
    )
  }
}
ScheduleContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}


function mapStateToProps(state){
  return {
    schedule: state.locationReducer
  }
}
function mapDispatchToProps(dispatch){
  return{
    actions:{
      updateFocusDay: bindActionCreators(updateFocusDay, dispatch),
      deleteLocation: bindActionCreators(deleteLocation, dispatch)
    } 
  }
}
/* function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(addCounter, dispatch) }
} */
//export default connect(mapDispatchToProps)(DatePicker);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScheduleContainer));