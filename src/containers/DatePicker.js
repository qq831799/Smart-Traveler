import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTripDuration } from '../actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Green from '@material-ui/core/colors/green';

const styles = theme => ({
  datePickerRoot:{
    paddingTop: '1em',
    paddingBottom: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  buttonPosition:{
    width:'fit-content',
  },
  visiable:{
    display : 'none',
  },
  textField:{
    margin:'0 auto',
  },
  button:{
    backgroundColor: Green[500],
    '&:hover': {
      backgroundColor: Green[500],
    },
  },
  startDate:{

  },
  endDate:{

  },
});

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.startDate = React.createRef(); //to get start date value
    this.endDate = React.createRef();   //to get end date value
    this.state = {
      startDateIsError: false,
      endDateIsError: false,
      errorMsg : "",
    }
    
    //預設為今天(格式為 yyyy-MM-dd)
    let today = new Date();
    this.today = '' + today.getFullYear() + '-' 
                    + ((today.getMonth()+1)<10 ? '0' + (today.getMonth()+1) : (today.getMonth()+1)) + '-'
                    + ((today.getDate())<10 ? '0' + (today.getDate()) : (today.getDate()));
    this.startDateIsError = false;
    this.endDateIsError = false;
    // this.calculateDuration = this.calculateDuration.bind(this); // declare and bind calculateDuration function
  }
  calculateDuration(start, end){ //calculate the duration between two dates
    // console.log(props);
    let startDate = new Date(start);
    let endDate = new Date(end);
    console.log((endDate-startDate)/(24*3600*1000) + 1);
    return (endDate-startDate)/(24*3600*1000) + 1;  //divide by (24*3600*1000) because the unit of difference is microsecond
  }

  handleClick(e){
    e.preventDefault();
    if(this.startDate.value !== '' && this.endDate.value !== ''){ //If start date and end date is not null
      this.setState({startDateIsError: false});
      this.setState({endDateIsError: false});
      
      if(new Date(this.endDate.value) - new Date(this.startDate.value) < 0 ){ //If end date < start date display Error
        this.setState({endDateIsError: true});
        this.setState({errorMsg: "End date can't be earlier than start date"});
      } else {
        const start = this.startDate.value;
        const end = this.endDate.value;
        this.props.actions(start,end,this.calculateDuration(start,end));
      }      
    }
    else {
      if(this.startDate.value === ''){  //If start date is null display Error
        this.setState({startDateIsError: true});
        this.setState({errorMsg: "Start date can't be null"});
      }
      if(this.endDate.value === ''){  //If start date is null display Error
        this.setState({endDateIsError: true});
        this.setState({errorMsg: "End date can't be null"});
      }
      
    }
  }
  render() {
    const {classes} = this.props;
    return (
      <Grid container 
            className={classes.datePickerRoot}
            alignItems='center'
            justify='space-around'
            >
        <Grid item className={classes.startDate}>
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
            <FormHelperText id="name-error-text"
            error={this.state.startDateIsError}
            className = { this.state.startDateIsError ? "" : classes.visiable }
            >{ this.state.errorMsg }</FormHelperText>
          </form>
        </Grid>
        <Grid item className={classes.endDate}>
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
            <FormHelperText id="name-error-text"
            error={true}
            className = { this.state.endDateIsError ? "" : classes.visiable }
            >{ this.state.errorMsg }</FormHelperText>
          </form>
        </Grid>
        <Grid item>
        <div className={classes.buttonPosition}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {this.handleClick(e)}}
            //className={classes.button}
          >
            Set Days
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
  return { actions: bindActionCreators(updateTripDuration , dispatch) }
}
//export default connect(mapDispatchToProps)(DatePicker);
export default connect(null,mapDispatchToProps)(withStyles(styles)(DatePicker));