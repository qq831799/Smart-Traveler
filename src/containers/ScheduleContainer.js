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
      borderWidh: '1px',
      borderStyle: 'solid',
    },
  });

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item xs={12} className={classes.scheduleContainer}>
          <h3>Schedule</h3>
          <Day dayID={1}></Day>
        </Grid>
      </Grid>
    )
  }
}
ScheduleContainer.propTypes = {
    classes: PropTypes.object.isRequired,
}
/* function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(addCounter, dispatch) }
} */
//export default connect(mapDispatchToProps)(DatePicker);
export default withStyles(styles)(ScheduleContainer);