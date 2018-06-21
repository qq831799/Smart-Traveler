import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCounter } from '../actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Day from '../components/Day'


const styles = theme => ({
    scheduleContainer:{

    },
  });

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
  }
  calculateDate(props){
    let startDate = new Date(props.days[0].startDate);
    let endDate = new Date(props.days[0].endDate);
    //console.log(props.days.startDate);
    console.log((endDate-startDate)/(24*3600*1000));
    return (endDate-startDate)/(24*3600*1000) + 1
  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item xs={12} className={classes.scheduleContainer}>
          <h3>Schedule</h3>
            {[...Array(this.calculateDate(this.props))].map(
              (e , i) => {return <Day dayID={i+1} key={'day' + i + 1} location={this.props.location}></Day>}
            )}
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
    days: state.dateIntervalReducer,
    location: state.locationReducer
  };

}
/* function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(addCounter, dispatch) }
} */
//export default connect(mapDispatchToProps)(DatePicker);
export default connect(mapStateToProps)(withStyles(styles)(ScheduleContainer));