import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDateInterval } from '../actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  datePickerRoot:{
    borderBottom: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: grey[500],
    paddingTop: '1em',
    paddingBottom: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  buttonPosition:{
    width:'fit-content',
  },
  startDate:{

  },
  endDate:{

  },
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.startDate = React.createRef();
    this.endDate = React.createRef();

    //預設為今天(格式為 yyyy/MM/dd)
    let today = new Date();
    this.today = '' + today.getFullYear() + '-' 
                    + ((today.getMonth()+1)<10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1)) + '-'
                    + ((today.getDate()+1)<10 ? '0' + (today.getDate()) : (today.getDate()));
    this.startDateIsError = false;
    this.endDateIsError = false;
  }
  state = {
    startDateIsError: false,
    endDateIsError: false,
  }

  handleClick(e){
    e.preventDefault();
    if(this.startDate.value !== '' && this.endDate.value !== ''){
      this.setState({startDateIsError: false});
      this.setState({endDateIsError: false});
      this.props.dispatch(addDateInterval(this.startDate.value,this.endDate.value));
    
    } else {

      if(this.startDate.value === ''){
        this.setState({startDateIsError: true})
      }
      if(this.endDate.value === ''){
        this.setState({endDateIsError: true})
      }
      
    }
  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.datePickerRoot}>
        <Grid item xs={4} className={classes.startDate}>
          <form noValidate>
            <TextField
              id="StartDate"
              label="Start Date"
              type="date"
              required={ true }
              error={ this.state.startDateIsError }
              defaultValue={this.today}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={(e) => {this.startDate = e}}
            />
          </form>
        </Grid>
        <Grid item xs={4} className={classes.endDate}>
          <form noValidate>
            <TextField
              id="EndDate"
              label="End Date"
              type="date"
              required={ true }
              error={ this.state.endDateIsError }
              defaultValue={this.today}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={(e)=>{this.endDate = e}}
            />
          </form>
        </Grid>
        <Grid item xs={4}>
        <div className={classes.buttonPosition}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {this.handleClick(e)}}
          >
            確認
          </Button>
        </div>
        </Grid>
      </Grid>
    )
  }
}
DatePicker.propTypes = {
    classes: PropTypes.object.isRequired,
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(addDateInterval , dispatch) }
}
//export default connect(mapDispatchToProps)(DatePicker);
export default connect(mapDispatchToProps)(withStyles(styles)(DatePicker));