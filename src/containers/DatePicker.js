import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCounter } from '../actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  startDate:{
    borderWidh: '1px',
    borderStyle: 'solid',
  },
  endDate:{
    borderWidh: '1px',
    borderStyle: 'solid',
  },
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid item xs={6} className={classes.startDate}>
          <form noValidate>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
        <Grid item xs={6} className={classes.endDate}>
        <form noValidate>
            <TextField
              id="date"
              label="End Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
      </Grid>
    )
  }
}
DatePicker.propTypes = {
    classes: PropTypes.object.isRequired,
}
/* function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(addCounter, dispatch) }
} */
//export default connect(mapDispatchToProps)(DatePicker);
export default withStyles(styles)(DatePicker);